from rtb_engine.simulator import run_simulation

if __name__ == "__main__":
    results = run_simulation()

    print("Simulation Results")
    print("------------------")
    print("Clicks:", results["clicks"])
    print("Conversions:", results["conversions"])
    print("Score:", results["score"])
    print("Remaining Budget:", results["remaining_budget"])
