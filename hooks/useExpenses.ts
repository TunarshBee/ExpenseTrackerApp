import { type Expense } from "@/types/Expense.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const simulateBlockchainInteraction = async (expense: Expense) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Transaction Successful");
    }, 2000);
  });
};

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  const addExpense = async (newExpense: Expense) => {
    setLoading(true);
    try {
      const transactionMessage = await simulateBlockchainInteraction(newExpense);
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      alert(transactionMessage);
    } catch (error) {
      alert("Error storing expense on the blockchain");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const retrieveExpenses = async () => {
    setLoading(true);
    try {
      const storedExpenses = await AsyncStorage.getItem("expenses");
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      } else {
        setExpenses([]);
      }
    } catch (error) {
      alert("Error retrieving expenses from the blockchain");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return { expenses, addExpense, retrieveExpenses, loading };
};
