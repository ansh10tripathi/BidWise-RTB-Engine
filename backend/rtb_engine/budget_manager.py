class BudgetManager:
    def __init__(self, initial_budget):
        self.initial_budget = initial_budget
        self.remaining_budget = initial_budget

    def can_bid(self, amount):
        return self.remaining_budget >= amount

    def deduct(self, amount):
        self.remaining_budget -= amount

    def get_budget_factor(self):
        return self.remaining_budget / self.initial_budget
