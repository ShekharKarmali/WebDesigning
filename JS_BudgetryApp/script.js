console.log("Let's make a budgetry App!");

//***************************Budget Controller****************************

var budgetcontroller = (function () {

    var Income = function (id, des, val) {
        this.id = id;
        this.des = des;
        this.val = val;
    };

    var Expense = function (id, des, val) {
        this.id = id;
        this.des = des;
        this.val = val;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalincome) {
        // console.log(totalincome);
        if (totalincome > 0) {
            this.percentage = Math.round((this.val / totalincome) * 100);
        }
        else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var data = {
        allitem: {
            inc: [],
            exp: []
        },

        totalitem: {
            inc: 0,
            exp: 0
        },

        budget: 0,
        percentage: -1
    };

    var calculatetotal = function (type) {
        var sum = 0;
        data.allitem[type].forEach(function (cur) {
            sum += cur.val;
        });
        data.totalitem[type] = sum;
        // console.log(sum);
    }
    

    return {
        addItem: function (type, des, val) {
            //create Id
            var newItem, ID;

            if (data.allitem[type].length > 0) {
                ID = data.allitem[type][data.allitem[type].length-1].id + 1;
            } else {
                ID = 0;
            }

            //add Item 
            if (type == 'inc') {
                newItem = new Income(ID, des, val);
            } else {
                newItem = new Expense(ID, des, val);
            }

            //Push into data structure;
            data.allitem[type].push(newItem);
            // console.log("pushed data is "+ data);

            return newItem;
        },

        calculateBudget: function () {
            calculatetotal('inc');
            calculatetotal('exp');

            data.budget = data.totalitem.inc - data.totalitem.exp;
        },

        calculatePercentage: function () {
            data.allitem.exp.forEach(function (cur) {
                cur.calcPercentage(data.totalitem.inc);
            });
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totalitem.inc,
                totalExp: data.totalitem.exp,
                percentage: data.percentage
            };
        },

        getPercentage: function () {
            var allperc = data.allitem.exp.map(function (cur) {
                return cur.getPercentage();
            });

            return allperc;
        },

        DeleteItem: function (type, Id) {
            var IDs,index;
            IDs = data.allitem[type].map(function (current) {
                return current.id;
            });
            
            console.log(IDs);
            index = IDs.indexOf(Id);
            // console.log(index);

            if (index !== -1) {
                data.allitem[type].splice(index, 1);
            }
        },

        Testing: function () {
            console.log(data);
        }
    }
})();



//---------------------------------UI Controller--------------------------

var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetlevel: '.budget__value',
        incomelevel: '.budget__income--value',
        expenselevel: '.budget__expenses--value',
        container: '.container',
        percentlevel: '.budget__expenses--percentage'
    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDesc).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        },

        addListItem: function (obj,type) {
            var html, newhtml,element;

            if (type == 'inc') {
                element=DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else {
                element=DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newhtml = html.replace('%id%', obj.id);
            newhtml = newhtml.replace('%description%', obj.des);
            newhtml = newhtml.replace('%value%', obj.val);

            document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
        },

        DeletelistItem: function (ItemID) {
            var el = document.getElementById(ItemID);
            el.parentNode.removeChild(el);
        },

        DisplayBudget: function (obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetlevel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomelevel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenselevel).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentlevel).textContent = obj.percentage + '%';
            }
            else {
                document.querySelector(DOMstrings.percentlevel).textContent = '---';
            }
        },

        DisplayPercentage: function (percentage) {
            var fields = document.querySelectorAll(DOMstrings.percentlevel);

            nodeListForEach(fields, function (current, index) {

                if (percentage[index] > 0) {
                    current.textContent = percentage[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        clearField: function () {
            var field, fieldarr;
            field = document.querySelectorAll(DOMstrings.inputDesc + "," + DOMstrings.inputValue);

            fieldarr = Array.prototype.slice.call(field);

            fieldarr.forEach(function (current, index, Array) {
                current.value = "";
            });
            fieldarr[0].focus();
        }

    };

})();


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~$$$--App Controller--$$$~~~~~~~~~~~~~~~~~~~~~~~~~~

var Controller = (function (budgetCtrl, UICtrl) {
    
    var setUpEventListner = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', CtrladdItem);
        
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                CtrladdItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', CtrlDeleteItem);

    }
    var CtrladdItem = function () {
        var Input, newItem;
        
        Input = UICtrl.getInput();

        if (Input.description !== '' && !isNaN(Input.value) && Input.value > 0) {
            
            newItem = budgetCtrl.addItem(Input.type, Input.description, Input.value);
    
            // Add item to UI
            UICtrl.addListItem(newItem, Input.type);
    
            //clear the field
            UICtrl.clearField();
            
            // Update Budget
            UpdateBudget();

            //Update percentage
            UpdatePercentage();

        }

    };
    
    var CtrlDeleteItem = function (event) {
        var ItemID, splitID, type, ID;
        ItemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        // console.log(ItemID);

        if (ItemID) {
            splitID = ItemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //Delete item from data structure
            budgetCtrl.DeleteItem(type, ID);

            //Delete item from UI
            UICtrl.DeletelistItem(ItemID);

            //Update and show budget
            UpdateBudget();
        }
    };

    var UpdateBudget = function () {

        //calulate the budget
        budgetCtrl.calculateBudget();

        //take out the budget
        var Budget = budgetCtrl.getBudget();

        //Display the budget on UI
        UICtrl.DisplayBudget(Budget);
    };

    var UpdatePercentage = function () {
        //calculate the percentage
        budgetCtrl.calculatePercentage();

        //Take out the percentage
        var perc = budgetCtrl.getPercentage();

        //Display the percentage on the UI
        UICtrl.DisplayPercentage(perc);
        // console.log(perc);

    };

    return {
        init:function () {
            console.log("Application has been started!");
            UICtrl.DisplayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setUpEventListner();
        }
    }

})(budgetcontroller, UIController);


Controller.init();










