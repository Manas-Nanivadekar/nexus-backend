const { ApiPromise, WsProvider } = require("@polkadot/api");

const socket = process.env.SOCKET;

// Initialise the provider to connect to the local node
const provider = new WsProvider(socket);

async function connect() {
  const api = await ApiPromise.create({
    provider: provider,
    types: {
      Payee: {
        destinationCountryId: "Text",
        destinationBankIdentifier: "Text",
        destination_bank_account_number: "Text",
      },
      DestinationPayee: {
        destinationBankAccHolderName: "Text",
        destinationBankAccDisplayName: "Text",
      },
      Quote: {
        sourceLp: "Text",
        destinationLp: "Text",
        rate: "Text",
        public: "bool",
        timestamp: "Text",
        sourceBankId: "Text",
        quoteUuid: "Text",
        fxpUuid: "Text",
      },
      Sld: {
        iban: "bool",
        countryId: "Text",
        localBankNumber: "Text",
        localBankId: "Text",
        aliasConversion: "Text",
        aliasName: "Text",
        aliasFormat: "Text",
        aliasDesc: "Text",
        maxDestinationValue: "Text",
        accountValidationAvailable: "bool",
        payeeType: "bool",
        ipsTimeout: "Text",
      },
      FinalPaymentStruct: {
        messageId: "Text",
        creationTime: "Text",
        settlementAmount: "Text",
        paymentUuid: "Text",
        clearingSystemRef: "Text",
        chargeBearer: "Text",
        quoteUuid: "Text",
        lpSource: "Text",
      },
      DestinationBankStruct: {
        destBankId: "Text",
        destBankAccNumber: "Text",
        destBankAccName: "Text",
        destBankAccAdd: "Text",
        destBankAccDob: "Text",
        destBankAccDop: "Text",
        destBankNationalId: "Text",
      },
      SourceBankStruct: {
        sourceBankId: "Text",
        sourceBankAccNumber: "Text",
        sourceBankAccName: "Text",
        sourceBankAccAdd: "Text",
        sourceBankAccDob: "Text",
        sourceBankAccDop: "Text",
        sourceBankNationalId: "Text",
      },
      DestBankStauts: {
        status: "Text",
        reasonForStatus: "Text",
      },
    },
  });

  return api;
}

module.exports = connect;
