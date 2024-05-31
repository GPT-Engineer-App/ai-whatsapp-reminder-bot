import { useState } from "react";
import { Container, VStack, Text, Input, Button, HStack, List, ListItem, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaWhatsapp } from "react-icons/fa";

const Index = () => {
  const [reminders, setReminders] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const addReminder = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Input is empty",
        description: "Please enter a reminder.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setReminders([...reminders, inputValue]);
    setInputValue("");
  };

  const deleteReminder = (index) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  const sendToWhatsApp = (reminder) => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(reminder)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">WhatsApp Reminders Bot</Text>
        <HStack width="100%">
          <Input placeholder="Enter your reminder" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <Button onClick={addReminder} colorScheme="teal">
            Add
          </Button>
        </HStack>
        <List spacing={3} width="100%">
          {reminders.map((reminder, index) => (
            <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
              <Text>{reminder}</Text>
              <HStack>
                <IconButton aria-label="Send to WhatsApp" icon={<FaWhatsapp />} colorScheme="whatsapp" onClick={() => sendToWhatsApp(reminder)} />
                <IconButton aria-label="Delete reminder" icon={<FaTrash />} colorScheme="red" onClick={() => deleteReminder(index)} />
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
