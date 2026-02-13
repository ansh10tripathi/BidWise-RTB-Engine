from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rtb_engine.simulator import run_simulation, run_baseline


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "BidWise RTB Engine Running Successfully 🚀"}

@app.get("/baseline")
def baseline():
    return run_baseline()


@app.get("/optimized")
def optimized():
    return run_simulation()


@app.get("/simulate")
def simulate(strategy: str = "optimized"):
    if strategy == "baseline":
        return run_baseline()
    else:
        return run_simulation()
