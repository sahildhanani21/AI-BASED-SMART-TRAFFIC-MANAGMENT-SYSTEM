import threading
import time
import random
from datetime import datetime
from pymongo import MongoClient
import pandas as pd
import joblib

# ==========================
#  MongoDB Atlas Config
# ==========================
MONGO_URI = "mongodb+srv://sahildhanani2004:admin@cluster0.6a818fy.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URI)
db = client["traffic_db"]

# Collection 1 → Analytics
analytics_collection = db["traffic_analytics"]

# Collection 2 → Predictions (NEW)
prediction_collection = db["traffic_predictions"]

# ==========================
#  Load ML Model
# ==========================
model = joblib.load("traffic_model.pkl")

# ==========================
#  Global Config
# ==========================
AREAS = ["Nikol", "Bapunagar", "CG Road"]
DIRECTIONS = ["north", "south", "east", "west"]

ANALYTICS_INTERVAL = 60
area_stats = {}
stats_lock = threading.Lock()
interval_count = 0

# Direction Mapping (Model Output → Direction)
direction_map = {
    0: "north",
    1: "south",
    2: "east",
    3: "west"
}

# ==========================
# 🚦 Traffic Simulation Per Area (ML Based)
# ==========================
def run_area(area_name):
    global area_stats

    print(f"🚦 ML Traffic simulation started for {area_name}")

    while True:

        #  Simulate vehicle counts
        counts = {
            direction: random.randint(5, 30)
            for direction in DIRECTIONS
        }

        #  Create ML Features
        current_time = datetime.utcnow()
        time_slot = current_time.hour
        day_type = 1 if current_time.weekday() >= 5 else 0

        input_data = pd.DataFrame([{
            "time_slot": time_slot,
            "day_type": day_type,
            "north_count": counts["north"],
            "south_count": counts["south"],
            "east_count": counts["east"],
            "west_count": counts["west"]
        }])

        #  Predict Best Direction
        prediction = model.predict(input_data)[0]
        best_direction = direction_map.get(prediction, "north")

        # Calculate Total Vehicles
        total_vehicles = sum(counts.values())

        #  Congestion Logic
        if total_vehicles > 80:
            congestion = "High"
        elif total_vehicles > 50:
            congestion = "Medium"
        else:
            congestion = "Low"

        # 🔹 Dynamic Green Time
        green_time = max(5, counts[best_direction] // 2)

        print(f"\n🚦 {area_name}")
        print(f"Predicted Green → {best_direction.upper()}")
        print(f"Vehicles → {counts[best_direction]} | Time → {green_time}s")

        # ==========================
        #  STORE PREDICTION (NEW COLLECTION)
        # ==========================
        prediction_document = {
            "timestamp": current_time,
            "area": area_name,
            "predicted_direction": best_direction,
            "predicted_vehicles_per_min": counts[best_direction],
            "total_vehicles": total_vehicles,
            "predicted_congestion": congestion,
            "avg_speed_kmh": max(20, 60 - total_vehicles // 2)
        }

        try:
            prediction_collection.insert_one(prediction_document)
            print(" Prediction Stored")
        except Exception as e:
            print(" Prediction Insert Error:", e)

        # ==========================
        # 📊 UPDATE ANALYTICS MEMORY
        # ==========================
        with stats_lock:
            area_stats[area_name] = {
                "north": counts["north"],
                "south": counts["south"],
                "east": counts["east"],
                "west": counts["west"],
                "total": total_vehicles
            }

        time.sleep(green_time)

# ==========================
#  Save Analytics Every 60 Sec
# ==========================
def analytics_worker():
    global interval_count, area_stats

    while True:
        time.sleep(ANALYTICS_INTERVAL)
        interval_count += 1

        with stats_lock:
            if not area_stats:
                continue

            document = {
                "timestamp": datetime.utcnow(),
                "interval": interval_count,
                **area_stats
            }

            try:
                analytics_collection.insert_one(document)
                print(" Analytics Data Inserted")
            except Exception as e:
                print(" Analytics Insert Error:", e)

            area_stats = {}

# ==========================
# Start System
# ==========================
if __name__ == "__main__":

    # Start area simulation threads
    for area in AREAS:
        t = threading.Thread(target=run_area, args=(area,))
        t.daemon = True
        t.start()

    # Start analytics thread
    analytics_thread = threading.Thread(target=analytics_worker)
    analytics_thread.daemon = True
    analytics_thread.start()

    print(" Smart Traffic System Running...")

    while True:
        time.sleep(1)