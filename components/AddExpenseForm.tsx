import React, { useState, useEffect } from "react";
import { Button, Input, VStack } from "native-base";
import { Expense } from "../types/Expense.types";
import { useExpenses } from "@/hooks/useExpenses";
import { ActivityIndicator } from "react-native";
import FilterSelect from "./FilterSelect";
import { generateShortId } from "@/utils/uuid";

interface AddExpenseFormProps {
  addExpense: (expense: Expense) => void;
  availableCategories: string[];
  addCategory: (category: string) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  addExpense,
  availableCategories,
  addCategory,
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { loading } = useExpenses();
  useEffect(() => {
    if (description && amount && (category || newCategory)) {
      setIsFormValid(true);
    }
  }, [description, amount, category, newCategory]);

  const handleSubmit = () => {
    const selectedCategory = newCategory.trim() || category;

    // Add new category to available categories if it's new
    if (newCategory.trim()) {
      addCategory(newCategory);
    }

    const newExpense: Expense = {
      id: generateShortId() as any,
      description,
      amount: parseFloat(amount),
      category: selectedCategory as string,
    };

    addExpense(newExpense);

    setDescription("");
    setAmount("");
    setCategory("");
    setNewCategory("");
  };

  return (
    <VStack space={4} p={4} borderRadius="md" bg="gray.100" shadow={2}>
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        variant="outline"
        borderColor="gray.400"
        size="md"
      />
      <Input
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        variant="outline"
        borderColor="gray.400"
        size="md"
      />
      <FilterSelect selectedCategory={category} onCategoryChange={(value) => {
          setCategory(value);
          setNewCategory("");
        }} categories={availableCategories}/>
      <Input
        placeholder="Or Add New Category"
        value={newCategory}
        onChangeText={setNewCategory}
        variant="outline"
        borderColor="gray.400"
        size="md"
      />
      {loading !== false ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <Button
          onPress={handleSubmit}
          isDisabled={!isFormValid}
          bg={isFormValid ? "blue.500" : "gray.300"}
          _text={{ color: "white" }}
        >
          Add Expense
        </Button>
      )}
    </VStack>
  );
};

export default AddExpenseForm;
