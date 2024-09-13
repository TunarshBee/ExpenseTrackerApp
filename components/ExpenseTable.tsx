import React from "react";
import { HStack, Text, Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Expense } from "../types/Expense.types";

interface ExpenseTableProps {
  expenses: Expense[];
  deleteExpense: (id: number) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  deleteExpense,
}) => (
  <>
    <HStack space={2} p={2} borderBottomWidth={1} borderColor="gray.400">
      <Text flex={1}>ID</Text>
      <Text flex={2}>Description</Text>
      <Text flex={1.5}>Category</Text>
      <Text flex={1}>Amount</Text>
      <Text flex={1}>Action</Text>
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
        <Button flex={1} onPress={() => deleteExpense(item.id)} variant="ghost">
          <FontAwesome name="trash" color="red.500" />
        </Button>
      </HStack>
    ))}
  </>
);

export default ExpenseTable;
