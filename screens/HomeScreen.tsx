import React, { useEffect, useState } from "react";
import { Box, VStack, ScrollView, Text } from "native-base";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import FilterSelect from "../components/FilterSelect";
import WalletConnector from "../components/WalletConnector";
import { useExpenses } from "../hooks/useExpenses";

const HomeScreen: React.FC = () => {
  const { expenses, addExpense, retrieveExpenses } = useExpenses();

  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);

  // useEffect(() => {
  //   retrieveExpenses(); // Retrieve expenses when component mounts
  // });

  useEffect(() => {
    // Update categories based on current expenses
    const uniqueCategories = Array.from(
      new Set(expenses.map((exp) => exp.category))
    );
    setCategories(["All", ...uniqueCategories]);
  }, [expenses]); // Trigger whenever expenses update

  const filteredExpenses =
    filterCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === filterCategory);

  const handleFilterChange = (category: string) => {
    setFilterCategory(category);
  };

  return (
    <Box flex={1} p={4}>
      <WalletConnector />
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
            availableCategories={categories}
            addExpense={addExpense} // Pass the addExpense function
            addCategory={(category) => setCategories([...categories, category])}
          />

          {/* Expense Table */}
          <ExpenseTable expenses={filteredExpenses} />
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
