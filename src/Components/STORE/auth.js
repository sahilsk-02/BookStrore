import { configureStore, createSlice } from "@reduxjs/toolkit";

// Dummy format for user: {"_id":"64cd1db18964820eeb7eeaa0","id":921,"email":"sahilchopdia1@gmail.com","firstName":"Sahil","lastName":"Chopdia","roleId":3,"role":"buyer","password":"12345","__v":0}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: localStorage.getItem("user") ? true : false,
    rollId: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).roleId : null,
  },
  reducers: {
    logout: (state) => {
      state.auth = false;
      
    },
    login: (state) => {
      state.auth = true;
      
    },
    setRole:(state,action)=>{
      state.roleId=action.payload.roleId;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
