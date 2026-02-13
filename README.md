example

* Updating someones personal info 
    * split across two databases -- person info like name, age, etc is in one. Address is in another database


2pc protocol

Phase 1) 
1. The transaction coordinator generates a unique UUID for the prepare transaction
2. The transaction coordinator does the prepare transaction to both databases
3. Each response from the database is either success to commit, or failure to commit. Write these to our local log

Phase 2). 
* Check the responses. If both are commit, then commit
* If not, then send rollback to each database
* Delete local record of transaction coordination


Recovery) 
* If database node fails 
    * During attempt to prepare transaction (no response from prepare transaction) -- rollback any that succeeded
    * If it fails after the response (during the commit phase). Keep retrying to send the commit or rollback with exponential backoff to the DB

* If coordinator fails
    * After getting response back but before writing responses to local DB 
        * simply try to create the transactions again. If we get some sort of conflict exception, we know its created already. Write status back to our database
    * After getting & writing responses back -- read local db for responses and txid
        * commit/rollback as needed
    * After sending commit message, but before deleting the db record
        * just read the status and commit/rollback as needed. Ignore errors of missing prepared transactions
            
