import React from "react";
import { Box, VStack, ScrollView, Text } from "native-base";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import FilterSelect from "../components/FilterSelect";
import WalletConnector from "../components/WalletConnector";
import { useExpenses } from "../hooks/useExpenses";

const HomeScreen: React.FC = () => {
  const { expenses, addExpense, deleteExpense } = useExpenses();

  const [filterCategory, setFilterCategory] = React.useState<string>("All");
  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Extract categories from expenses
    const uniqueCategories = Array.from(
      new Set(expenses.map((exp) => exp.category))
    );
    setCategories(["All", ...uniqueCategories]);
  }, [expenses]);

  const filteredExpenses =
    filterCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === filterCategory);

  const handleFilterChange = (category: string) => {
    setFilterCategory(category);
  };

  return (
    <Box flex={1} p={4}>
      <WalletConnector
      />
      <ScrollView flex={1}>
        <VStack space={4}>
          <Text>
            Total: $
            {filteredExpenses
              .reduce((sum, exp) => sum + exp.amount, 0)
              .toFixed(2)}
          </Text>

          {/* Filter Dropdown */}
          <FilterSelect
            selectedCategory={filterCategory}
            onCategoryChange={handleFilterChange}
            categories={categories}
          />

          {/* Add Expense Form */}
          <AddExpenseForm
            addExpense={addExpense}
            availableCategories={categories}
            addCategory={(category) => setCategories([...categories, category])}
          />

          {/* Expense Table */}
          <ExpenseTable
            expenses={filteredExpenses}
            deleteExpense={deleteExpense}
          />
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
