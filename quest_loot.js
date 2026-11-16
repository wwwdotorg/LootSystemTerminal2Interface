// Quest loot with total value


const prompt = require("prompt-sync")();

// Array designed to take in objects making it an array of objects
const loot = [];

// base case for the program that would only change unless they press any key when prompted to do that
let running = true;
while(running){
    // base case for the prompt which assumes that materialInput isn't done
    let materialInput = ''; 
    while(materialInput!='done'){
            
        materialInput = prompt('Enter loot name (or type \'done\' to finish): ');
        //case insensitive trick
        materialInput = materialInput.toLowerCase();
        //minimum of a single input.
        
        while(materialInput == 'done' ){
            if(loot.length == 0){
                console.log('\nMust insert at least 1 item\n');
                materialInput = prompt('Enter loot name (or type \'done\' to finish): ');
                materialInput = materialInput.toLowerCase();
            }else{
                break;
            }
        }
        if(materialInput != 'done'){
            let valueInput = parseInt(prompt('Enter value for ' + materialInput + ': '));
            // checking if it's a valid number
            while (isNaN(valueInput) || valueInput <= 0){
                valueInput = parseInt(prompt("Please enter a valid positive number: "));
            }
            //duplicate makes program check before inserting then adds to the sum necessity >>>>>>
            let dupeCheck = false;
            for(let i = 0; i<loot.length; i++){
                if(loot[i].name == materialInput){
                    valueInput+=loot[i].value
                    loot[i] = { name: materialInput, value: valueInput }
                    dupeCheck = true;
                    break;
                }  
            }
            //if there isn't a duplicate it behaves regularly
            if(dupeCheck == false){
                loot.push({ name: materialInput, value: valueInput });
            }
           
            // sorting algorithm swaps places in a nested loop.
            // iterates from left to right finding the highest value in each ith positon 
            // must find the highest value in the subarray before swapping
            for(let i = 0; i<loot.length-1; i++){
                
                for(let j = i+1; j<loot.length; j++){
                    if(loot[i].value < loot[j].value){
                        let temp = loot[i];
                        let temp2 = loot[j];
                        loot[j] = temp;
                        loot[i] = temp2;
                    }
                }
            }
        }
    }
        // output for loot collected
        console.log('\nLoot Collected:');
        for(let i = 0; i<loot.length; i++){
            console.log('[' + (i+1) + '] ' + loot[i].name + ' - ' + loot[i].value);
        }
        let totalVal = 0;
        for(let i = 0; i<loot.length; i++){
            totalVal = totalVal + loot[i].value;
        }
        console.log('\nTotal Loot Value = ' + totalVal);
    prompt('\nPress any key to continue...');
    running = false;
}


/* ============================================================================
   REFLECTION
-------------------------------------------------------------------------------
1)
   'loot' is a list, and every item in that list is a box holding two things:
   'name' and 'value' . The name comes from 'materialInput', which is turned 
   lowercase when it is typed, so "Gold" and "gold" count as the same item. 
   The worth comes from 'valueInput', which is turned into a number and 
   checked if it's a positive number. If you type a name you already entered, 
   the loop compares 'loot[i].name' to 'materialInput'; on a match 
   'valueInput' is added onto 'loot[i].value' and 'loot[i]' is replaced with 
   the bigger total, while 'dupeCheck' is set to true so 'loot.push' does not 
   add a second copy. The sort moves whole boxes around, so a name never gets 
   separated from its own value.

2) 'totalVal' begins at 0. As the loop goes through 'loot' the 'loot[i].value'
   is added to 'totalVal' then 'totalVal' keeps that new amount. The order of
   the list does not change the answer, and that is because duplicated items 
   are already combined into one item, nothing gets counted twice.
-------------------------------------------------------------------------------*/


