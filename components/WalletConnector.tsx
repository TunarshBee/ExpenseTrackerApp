import React, { useState } from "react";
import { Button, Text, VStack } from "native-base";
import { ethers } from "ethers";

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //################################################################################################
  // IMPORT THE INFURA PROJECT ID FROM A .env FILE
  // I'M INCLUDING THE INFURA PROJECT ID FOR TEST PURPOSE
  // Replace "your-infura-project-id" with your actual Infura project ID from the .env file.
  //################################################################################################

  const infuraProjectId = "aa2436a571ec444f90259d956abb34fa";

  const connectToInfuraWithPrivateKey = async () => {
    setLoading(true);
    try {
      const provider = new ethers.providers.InfuraProvider(
        "mainnet",
        infuraProjectId
      );
      const mnemonic =
        "test test test test test test test test test test test junk";

      const wallets = ethers.Wallet.fromMnemonic(mnemonic);
      const privateKey = wallets.privateKey; // Replace with your Ethereum private key
      const wallet = new ethers.Wallet(privateKey, provider);

      // Now you can use this wallet to sign transactions
      const address = await wallet.getAddress(); // Get wallet address

      setWalletAddress(address); // Save the wallet address

      console.log("Connected to Infura with wallet address:", address);
    } catch (error) {
      console.error("Error connecting to Infura with private key:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack space={4} alignItems="center">
      {walletAddress ? (
        <Text>Connected Wallet Address: {walletAddress}</Text>
      ) : (
        <Button onPress={connectToInfuraWithPrivateKey}>
          {loading ? "Please wait..." : "Connect Wallet"}
        </Button>
      )}
    </VStack>
  );
};

export default WalletConnector;
