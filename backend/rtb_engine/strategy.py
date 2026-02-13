class BiddingStrategy:
    def __init__(self, predictor, budget_manager, conversion_weight=5, base_bid=10):
        self.predictor = predictor
        self.budget_manager = budget_manager
        self.N = conversion_weight
        self.base_bid = base_bid

    def generate_bid(self, features):
        ctr = self.predictor.predict_ctr(features)
        cvr = self.predictor.predict_cvr(features)

        expected_value = ctr + self.N * cvr

        budget_factor = self.budget_manager.get_budget_factor()

        bid = expected_value * self.base_bid * budget_factor

        return bid
