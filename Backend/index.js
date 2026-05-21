const express = require("express");
const { configDotenv } = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");

/* ================= LOAD ENV ================= */
configDotenv();
const app = express();

/* ================= IMPORT APIs ================= */
const { register } = require("./apis/register");
const { login } = require("./apis/login");
const { logout } = require("./apis/logout");
const predictionRoutes = require("./apis/prediction");
const { chart } = require("./apis/chart");
const { stat } = require("./apis/stat");

/* ================= CORS ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"]
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= SESSION ================= */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "traffic_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax"
    }
  })
);

/* ================= BASIC ROUTE ================= */
app.get("/", (req, res) => {
  res.json({ status: true, message: "Traffic AI Server Running" });
});

/* ================= AUTH ROUTES ================= */
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);

/* ================= DATA ROUTES ================= */
app.get("/data", chart);
app.get("/stat", stat);

/* ================= ML ROUTES ================= */
app.use("/api/predictions", predictionRoutes.prediction);

/* ================= HTTP + SOCKET ================= */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

/* ================= MULTI AREA STATE ================= */
/*
Each area will maintain its own:
- priorityActive
- priorityCamera
*/

const areaState = {
  Bapunagar: { priorityActive: false, priorityCamera: null },
  Nikol: { priorityActive: false, priorityCamera: null },
  "CG Road": { priorityActive: false, priorityCamera: null }
};

/* ================= SOCKET EVENTS ================= */
io.on("connection", (socket) => {

  console.log("🔌 Client Connected:", socket.id);
  console.log("👥 Total Clients:", io.engine.clientsCount);

  /* ---------- LIVE VIDEO ---------- */
  socket.on("frame", (data) => {
    /*
      Expected:
      {
        area: "Bapunagar",
        camera: "north",
        image: base64Image
      }
    */
    io.emit("frame", data);
  });

  /* ---------- TRAFFIC DATA ---------- */
  socket.on("traffic_data", (data) => {

    /*
      Expected:
      {
        area: "Bapunagar",
        camera: "north",
        vehicleCount: 20,
        ambulance: true,
        confidence: 0.85
      }
    */

    io.emit("traffic_data", data);

    const area = data.area;

    if (!areaState[area]) return;

    /*  AMBULANCE PRIORITY PER AREA */
    if (
      data.ambulance === true &&
      data.confidence >= 0.75 &&
      !areaState[area].priorityActive
    ) {

      areaState[area].priorityActive = true;
      areaState[area].priorityCamera = data.camera;

      console.log(` Ambulance detected → ${area} → ${data.camera}`);

      /* Notify priority */
      io.emit("signal_priority", {
        area,
        camera: data.camera,
        confidence: data.confidence
      });

      /* Force Green Signal */
      io.emit("signal_update", {
        area,
        camera: data.camera,
        greenTime: 60,
        priority: true
      });

      /* Auto Reset after 60 sec */
      setTimeout(() => {

        areaState[area].priorityActive = false;
        areaState[area].priorityCamera = null;

        io.emit("signal_update", {
          area,
          camera: data.camera,
          greenTime: 10,
          priority: false
        });

        console.log(` Priority cleared → ${area}`);

      }, 60000);
    }
  });

  /* ---------- MANUAL SIGNAL UPDATE ---------- */
  socket.on("signal_update", (data) => {

    /*
      Expected:
      {
        area: "Bapunagar",
        camera: "north",
        greenTime: 15
      }
    */

    console.log(
      ` ${data.area} → ${data.camera.toUpperCase()} → ${data.greenTime}s`
    );

    io.emit("signal_update", data);
  });

  /* ---------- PRIORITY BROADCAST ---------- */
  socket.on("signal_priority", (data) => {
    io.emit("signal_priority", data);
  });

  socket.on("disconnect", () => {
    console.log(" Client Disconnected:", socket.id);
  });

});

/* ================= START SERVER ================= */
const PORT = 8080;

server.listen(PORT, () => {
  console.log(` Traffic AI Server Running → http://localhost:${PORT}`);
});