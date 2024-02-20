<template>
   <el-tree-select
     v-for="(treeSelect, index) in treeSelects"
     :key="index"
     v-model="treeSelect.model"
     :data="treeData"
     multiple
     :default-expand-all="true"
     show-checkbox
     :props="treeProps"
     @change="handleTreeSelectChange(index)"
   >
   </el-tree-select>
 </template>
 
 <script>
 export default {
   data() {
     return {
       treeSelects: [
         { model: [] }, // Array to store selected items for each tree select
         // Add more tree select components as needed
       ],
       treeData: [ // Your original array
         { id: 1, label: 'Item 1', value: 'item1', checked: true, children: [
           { id: 4, label: 'Child 1 of Item 1', value: 'child1', checked: true },
           { id: 5, label: 'Child 2 of Item 1', value: 'child2', checked: true },
         ] },
         { id: 2, label: 'Item 2', value: 'item2', checked: true, children: [
           { id: 6, label: 'Child 1 of Item 2', value: 'child3', checked: true },
           { id: 7, label: 'Child 2 of Item 2', value: 'child4', checked: true },
         ] },
         { id: 3, label: 'Item 3', value: 'item3', checked: true, children: [
           { id: 8, label: 'Child 1 of Item 3', value: 'child5', checked: true },
           { id: 9, label: 'Child 2 of Item 3', value: 'child6', checked: true },
         ] },
         // Add more items as needed
       ],
       treeProps: {
         children: 'children', // Customize children property if needed
         label: 'label', // Customize label property if needed
         checked: 'checked', // Specify the property that represents the checked state
       },
     };
   },
   methods: {
     handleTreeSelectChange(index) {
       // Update the data checkboxes when the tree select changes
       this.dataCheckboxes = this.treeSelects[index].model.map(item => item.value);
     },
   },
   watch: {
     dataCheckboxes(newVal) {
       // Perform any necessary actions when data checkboxes change
       console.log('Data Checkboxes:', newVal);
     },
   },
 };
 </script>
 