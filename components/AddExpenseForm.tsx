import React, { useState, useEffect } from "react";
import { Button, Input, VStack, Select } from "native-base";
import { Expense } from "../types/Expense.types";
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
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (description && amount && (category || newCategory)) {
      setIsFormValid(true);
    }
  }, [description, amount, category, newCategory]);

  const handleSubmit = () => {
    const selectedCategory = newCategory || category;
    if (newCategory && !availableCategories.includes(newCategory)) {
      addCategory(newCategory);
    }

    const newExpense: Expense = {
      id: generateShortId() as any,
      description,
      amount: parseFloat(amount),
      category: selectedCategory,
    };
    addExpense(newExpense);

    setDescription("");
    setAmount("");
    setCategory("");
    setNewCategory("");
  };

  return (
    <VStack space={4}>
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        variant="outline"
      />
      <Input
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        variant="outline"
      />
      <Select
        selectedValue={category}
        onValueChange={setCategory}
        placeholder="Select Category"
      >
        {availableCategories.map((cat) => (
          <Select.Item key={cat} label={cat} value={cat} />
        ))}
      </Select>
      <Input
        placeholder="Or Add New Category"
        value={newCategory}
        onChangeText={setNewCategory}
        variant="outline"
      />
      <Button
        onPress={handleSubmit}
        isDisabled={!isFormValid}
        bg={isFormValid ? "blue.500" : "gray.300"}
      >
        Add Expense
      </Button>
    </VStack>
  );
};

export default AddExpenseForm;
