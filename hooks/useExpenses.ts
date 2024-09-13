import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "../types/Expense.types";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses from AsyncStorage
  const loadExpenses = useCallback(async () => {
    try {
      const savedExpenses = await AsyncStorage.getItem("expenses");
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  // Save expenses to AsyncStorage
  const saveExpenses = useCallback(async (expenses: Expense[]) => {
    try {
      await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
    } catch (error) {
      console.error("Error saving expenses:", error);
    }
  }, []);

  // Add a new expense
  const addExpense = useCallback(
    (expense: Expense) => {
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses, expense];
        saveExpenses(updatedExpenses);
        return updatedExpenses;
      });
    },
    [saveExpenses]
  );

  // Delete an expense by ID
  const deleteExpense = useCallback(
    (id: number) => {
      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (expense) => expense.id !== id
        );
        saveExpenses(updatedExpenses);
        return updatedExpenses;
      });
    },
    [saveExpenses]
  );

  return {
    expenses,
    addExpense,
    deleteExpense,
  };
};
