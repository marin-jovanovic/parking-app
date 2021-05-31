var startDate,
  updateStartDate = function() {


    write_date(startDate);
    startPicker.setStartRange(startDate);
  
  },

  startPicker = new Pikaday({
    
    field: document.getElementById('start'),
    
    minDate: new Date(),
    
    maxDate: new Date(2021, 12, 31),

    onSelect: function() {
      startDate = this.getDate();
      updateStartDate();
    }
  }),
  
  _startDate = startPicker.getDate();
  
  if (_startDate) {
    startDate = _startDate;
    updateStartDate();
  }




//   getDateRange = function() {
//     starthr = document.getElementById('starthr');
//     startmin = document.getElementById('startmin');
//     pickedDate = startPicker.getDate();
//     realDate = new Date(pickedDate.getFullYear(), pickedDate.getMonth(), pickedDate.getDate(), parseInt(starthr.value), parseInt(startmin.value), 0, 0);
//     console.log("REAL DATE " + realDate);
//     currentDate = new Date();
//     if(currentDate.getFullYear() == realDate.getFullYear() &&
//         currentDate.getMonth() == realDate.getMonth() &&
//         currentDate.getDate() == realDate.getDate()){
//             console.log("AA " + realDate.getHours() + " " + (parseInt(currentDate.getHours()) + 6))
//             if(parseInt(realDate.getHours()) < (parseInt(currentDate.getHours()) + 6)){
//                 alert("RAZLIKE NIJE 6 SATI ")
//             }else if(parseInt(realDate.getHours()) == (parseInt(currentDate.getHours()) + 6)){
//                 if(parseInt(realDate.getMinutes()) < (parseInt(currentDate.getMinutes()))){
//                     alert("RAZLIKA NIJE 6 SATI")
//                 }else{
//                     console.log("OK")
//                 }
//             }else{
//                 console.log("OK")
//             }
//     }else if(currentDate.getFullYear() == realDate.getFullYear() &&
//     currentDate.getMonth() == realDate.getMonth() &&
//     currentDate.getDate() + 1 == realDate.getDate()){
//         console.log("AAAAAAAAa")
//         let tempHours;
//         if(realDate.getHours() - 6 < 0){
//             tempHours =  realDate.getHours() + 24;
//             console.log(tempHours);
//             if(parseInt(realDate.getHours()) < (parseInt(currentDate.getHours()) + 6)){
//                 alert("RAZLIKE NIJE 6 SATI ")
//             }else if(parseInt(realDate.getHours()) == (parseInt(currentDate.getHours()) + 6)){
//                 if(parseInt(realDate.getMinutes()) < (parseInt(currentDate.getMinutes()))){
//                     alert("RAZLIKA NIJE 6 SATI")
//                 }else{
//                     console.log("OK")
//                 }
//             }else{
//                 console.log("OK")
//             }
//         }
//     }
    
    
//   }


//   var startDate,
//   endDate,
//   updateStartDate = function() {
//   startPicker.setStartRange(startDate);
//   endPicker.setStartRange(startDate);
//   endPicker.setMinDate(startDate);
//   },
//   updateEndDate = function() {
//   startPicker.setEndRange(endDate);
//   startPicker.setMaxDate(endDate);
//   endPicker.setEndRange(endDate);
//   },
//   startPicker = new Pikaday({
//   field: document.getElementById('start'),
//   minDate: new Date(),
//   maxDate: new Date(2021, 12, 31),
//   onSelect: function() {
//   startDate = this.getDate();
//   updateStartDate();
//   }
//   }),
//   endPicker = new Pikaday({
//   field: document.getElementById('end'),
//   minDate: new Date(),
//   maxDate: new Date(2021, 12, 31),
//   onSelect: function() {
//   endDate = this.getDate();
//   updateEndDate();
//   }
//   }),
//   _startDate = startPicker.getDate(),
//   _endDate = endPicker.getDate();
//   if (_startDate) {
//   startDate = _startDate;
//   updateStartDate();
//   }
//   if (_endDate) {
//   endDate = _endDate;
//   updateEndDate();
//   }