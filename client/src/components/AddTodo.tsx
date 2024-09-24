import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Textarea, useToast } from '@chakra-ui/react';
import * as React from 'react';
import { BsSaveFill } from "react-icons/bs";

interface AddTodoProps {
    handleAddTodo: (data: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ handleAddTodo }) => {
    const [open, setOpen] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState<boolean>(false);
    const [value, setValue] = React.useState('');

    const toast = useToast();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setValue('');
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value);

    const saveTodo = () => {
        if (value.length >= 1 && value.length <= 80) {
            setIsSaving(true);

            setTimeout(() => {
                handleAddTodo(value);
                setIsSaving(false);

                toast({
                    title: "Todo saved.",
                    description: "Your todo has been successfully saved.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                handleClose();
            }, 2000);
        } else if (value.length === 0) {
            toast({
                title: "Input required.",
                description: "Please enter a todo item.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Too much text!",
                description: "Max 80 characters allowed per todo.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                colorScheme='blue'
                color="white"
                size="lg"
                variant="solid"
                borderRadius="full"
                position="absolute"
                right={15}
                bottom={15}
            >
                +
            </Button>
            <Modal
                isCentered
                onClose={handleClose}
                isOpen={open}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent maxWidth={{ base: "90%", sm: "80%", md: "40%" }}>
                    <ModalBody marginTop={5}>
                        <Textarea
                            value={value}
                            onChange={handleChange}
                            placeholder='Enter todo'
                            size='md'
                            resize='none'
                            overflow='hidden'
                            style={{ height: 'auto' }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button rightIcon={<BsSaveFill />} onClick={saveTodo} isLoading={isSaving} loadingText="Saving" colorScheme='blue'>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddTodo;