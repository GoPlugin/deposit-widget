# deposit-widget

pre-requisites  
npm version 8.15.0  
node version 16.7.1  
do seup XDCPay Chrome Extension in your chrome  


Steps to use the widget    
Step 1:  
clone the git package to your local pc  
git clone https://github.com/GoPlugin/deposit-widget.git  

Step 2:  
navigate to "deposit-widget/client/" folder on cmd promt and run below command to install dependencies  
npm install  

Step 3:  
Start the widget on your local host with below command.  
npm start  

Step 4:  
Login to your XDCPaywallet.  

Step 5:  
By default mainnet PLI address "0xff7412ea7c8445c46a8254dfb557ac1e48094391" is connected to the wallet, To change please refer Tips section below.  
On your widget First Approve your Internal contract address with PLI amount.  
Then Deposit PLI lesser than or equal to approved amount of PLI with your Internal Contract Address.  

Step 5:  
Now you will be able to trigger getPriceInfo function from customer contract.  
Same functionality can be triggered by calling requestData function from Internal Contract.  

Step 6:  
To set oracle fee on a Internal contract  
  -choose the owner account of Internal Contract in XDC pay wallet.  
  -enter the Internal Contract address and oracle fee in  "Set Oracle Fee" section.  
  -click set button.

Tips:  
To change the PLI address please modifiy the file "deposit-widget/client/src/utils.js" in line 22  
By default it is PLI mainnet PLI address  

