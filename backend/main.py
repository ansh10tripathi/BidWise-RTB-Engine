from rtb_engine.simulator import run_simulation, run_baseline

if __name__ == "__main__":

    print("Running Baseline Strategy...")
    baseline = run_baseline()

    print("\nBaseline Results")
    print("------------------")
    print("Clicks:", baseline["clicks"])
    print("Conversions:", baseline["conversions"])
    print("Score:", baseline["score"])
    print("Remaining Budget:", baseline["remaining_budget"])

    print("\nRunning Smart EV Strategy...")
    optimized = run_simulation()

    print("\nOptimized Results")
    print("------------------")
    print("Clicks:", optimized["clicks"])
    print("Conversions:", optimized["conversions"])
    print("Score:", optimized["score"])
    print("Remaining Budget:", optimized["remaining_budget"])
