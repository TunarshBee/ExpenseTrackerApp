import React, { useEffect } from "react";
import { HStack, Text, } from "native-base";
import { useExpenses } from "@/hooks/useExpenses";
import { ActivityIndicator } from "react-native";
import { type Expense } from "@/types/Expense.types";
interface ExpenseTableProps {
  expenses: Expense[];
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses
})=> {
  const { retrieveExpenses, loading } = useExpenses();

  useEffect(() => {
    retrieveExpenses(); // Simulate fetching expenses from the blockchain
  },[]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (expenses.length === 0) {
    return <Text>No expenses available</Text>;
  }
  return (
  <>
    <HStack space={2} p={2} borderBottomWidth={1} borderColor="gray.400">
      <Text flex={1}>ID</Text>
      <Text flex={2}>Description</Text>
      <Text flex={1.5}>Category</Text>
      <Text flex={1}>Amount</Text>
    </HStack>
    {expenses.map((item) => (
      <HStack
        key={item.id}
        space={2}
        p={2}
        borderBottomWidth={1}
        borderColor="gray.200"
      >
        <Text flex={1}>{item.id.toString().slice(0, 8)}...</Text>
        <Text flex={2}>{item.description}</Text>
        <Text flex={1.5}>{item.category}</Text>
        <Text flex={1}>${item.amount.toFixed(2)}</Text>
      </HStack>
    ))}
  </>
)};

export default ExpenseTable;
