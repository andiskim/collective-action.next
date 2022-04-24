import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  useColorModePreference,
  Text,
  Box,
  Textarea,
} from "@chakra-ui/react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { createBlobFromObject, loadFile } from "../util/helper";
import { callSmartContractFunction, pushToIPFS } from "../util/tatum";
import Actions from "../artifacts/contracts/Actions.sol/Actions.json";
import { AuthContext } from "../contexts/AuthContext";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const STAKE_AMOUNT = "0.01";
function OpenDispute({ id, proofIndex }) {
  const { currentUser } = useContext(AuthContext);
  console.log("fnr", process.env.STAKE_AMOUNT);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFile = useRef(null as HTMLInputElement | null);
  const [image, setImage] = useState(undefined as string | undefined);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  function validateName(value) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }

  const submit = async () => {
    setLoading(true);
    try {
      const imageCid = await pushToIPFS(await loadFile(image as string));
      await callSmartContractFunction(
        "openDispute",
        Actions.abi.filter(el => el.name === "openDispute")[0],
        [id, proofIndex, imageCid],
        STAKE_AMOUNT,
        (currentUser as any).privateKey
      );
      onClose();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw Error('Error');
    }
  }

  const handleSubmit = async (values) => {
    toast.promise(submit, {
      pending: "Interacting with contract",
      success: "Success!",
      error: "Error",
    });
  };
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <>
      <Button
        fontWeight="500"
        fontSize="14px"
        lineHeight="17px"
        borderRadius="16px"
        variant="ghost"
        onClick={onOpen}
      >
        Open Dispute
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Open Dispute</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                image: "",
              }}
              onSubmit={(values, actions) => {
                handleSubmit(values);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="image">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.image && form.touched.image}
                      >
                        <FormLabel htmlFor="image">Image Proof</FormLabel>
                        <Input
                          {...field}
                          type="file"
                          id="image"
                          ref={inputFile}
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={onImageChange}
                        />
                        {/*<Input {...field} id="image" placeholder="Image" />*/}
                        <Button
                          onClick={(e) =>
                            (inputFile.current as HTMLInputElement).click()
                          }
                        >
                          Upload
                        </Button>
                        <Box mt="18px" />
                        <img id="target" src={image} />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box mt="32px" mb="24px" textAlign="right">
                    <Button
                      type="submit"
                      colorScheme="green"
                      mr={3}
                      isLoading={props.isSubmitting}
                      disabled={loading}
                    >
                      Open Dispute
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Close
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </ModalBody>

          {/* <ModalFooter>
              <Input type="submit" colorScheme="green" mr={3}>
                Create
              </Input>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default OpenDispute;
