import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog"; // Fixed import to use proper Radix UI package
import goldmedal from '/assets/images/collectible_gold.png';
import { X } from 'lucide-react';

// Animation variants for dialog components
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

// const contentVariants = {
//   hidden: { opacity: 0, scale: 0.96 },
//   visible: { 
//     opacity: 1, 
//     scale: 1, 
//     transition: { 
//       type: "spring", 
//       duration: 0.4, 
//       bounce: 0.3 
//     } 
//   },
//   exit: { 
//     opacity: 0, 
//     scale: 0.96, 
//     transition: { 
//       duration: 0.2 
//     } 
//   }
// };

interface EmailDialogProps {
  isCompleted: boolean; // Whether all items have been collected
  isOpen?: boolean; // Optional prop to control open state externally
  onOpenChange?: (open: boolean) => void; // Optional callback for when dialog open state changes
}

const EmailDialog = ({ isCompleted, isOpen, onOpenChange }: EmailDialogProps) => {
  // Use external open state if provided, otherwise manage internally
	const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;
	const [result, setResult] = useState("");

  const handleOpenChange = (newOpenState: boolean) => {
    // Update internal state
    setInternalOpen(newOpenState);
    // Call external handler if provided
    if (onOpenChange) {
      onOpenChange(newOpenState);
    }
  };

  // Automatically open the dialog when all items are collected
  useEffect(() => {
    if (isCompleted) {
      handleOpenChange(true);
    }
  }, [isCompleted]);

  interface FormResponse {
    success: boolean;
    message: string;
  }

  interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement;
  }

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "deac3b35-d967-4fbc-9208-8fc2769c27aa");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data: FormResponse = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
			// Close dialog after successful submission
      setTimeout(() => handleOpenChange(false), 1000); // Added delay for user to see success message
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
      {/* We removed the trigger button as it will open automatically */}
      
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div 
                className="DialogOverlay"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayVariants}
              />
            </Dialog.Overlay>

            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Congratulations...</Dialog.Title>
                
                <motion.img
                  src={goldmedal}
                  alt="Gold Medal"
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                />
                
                <Dialog.Description className="DialogDescription">
                  You've completed your inventory...
                </Dialog.Description>
                <Dialog.Description className="DialogDescription">
                  As a reward, you've unlocked a... <br/><i>new track!</i>
                </Dialog.Description>
                <Dialog.Description className="DialogDescription email">
                  Enter your email to receive the download.
                </Dialog.Description>
                
                <form className="DialogForm" onSubmit={onSubmit}>
                  <fieldset className="Fieldset">
                    <label className="Label" htmlFor="name">
                      Name
                    </label>
                    <input className="Input" id="name" name="name" placeholder="name" defaultValue="" />
                  </fieldset>
                  <fieldset className="Fieldset">
                    <label className="Label" htmlFor="email">
                      Email
                    </label>
                    <input className="Input" id="email" placeholder="email" name="email" defaultValue="" type="email" required />
                  </fieldset>
                  <div className="DialogSubmitButton">
                    <button className="Button green" type="submit">Submit</button>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: result ? 1 : 0 }}
                    className="mt-2 text-sm"
                  >
                    {result}
                  </motion.div>
                </form>
                
                <Dialog.Close asChild>
                  <motion.button 
                    className="IconButton" 
                    aria-label="Close"
                    whileHover={{ scale: 1.1, backgroundColor: "#1e292b" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X />
                  </motion.button>
                </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
		</Dialog.Root>
	)};

export default EmailDialog;
