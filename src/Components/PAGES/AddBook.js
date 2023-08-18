import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../CSS/category.css";
import "../CSS/registration.css";
import "../UI/CSS/textBox.css";
import "../CSS/addBook.css";
import GreenButton from "../UI/GreenButton";
import RedButton from "../UI/RedButton";
import { toast } from "react-toastify";

function AddBook() {
  const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
  const image_validation = (file) => {
    if (!file || !IMAGE_TYPES.includes(file.type) || file.size >= 1000000) {
      return false;
    } else {
      return true;
    }
  };
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth.auth);

  const [formVal, setFormVal] = useState(false);

  const [bname, setBname] = useState("");
  const [bnameVal, changeBnameVal] = useState(false);

  const [description, setDescription] = useState("");
  const [descVal, changeDescVal] = useState(false);

  const [bprice, setBprice] = useState(0);
  const [bpriceVal, changeBpriceVal] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileVal, setSelectedFileVal] = useState(false);
  const [selectedFileBase, setSelectedFileBASE] = useState("");
  useEffect(() => {
    if (image_validation(selectedFile)) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setSelectedFileBASE(reader.result);
      };
      setSelectedFileVal(true);
    } else {
      setSelectedFileVal(false);
    }
  });

  const [categories, setCategories] = useState([]);
  const [categoryVal, changeCategoryVal] = useState(false);
  const [selectedCategory, setSelectedCategories] = useState(-1);

  const SaveHandler = (e) => {
    e.preventDefault();

    let new_book = {
      name: bname,
      description: description,
      price: parseInt(bprice),
      categoryId: parseInt(selectedCategory),
      base64image: selectedFileBase,
    };
    console.log(new_book);
    axios
      .post(`https://book-e-sell-node-api.vercel.app/api/book`, new_book)
      .then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          toast.success("Book added.");
          navigate("/products-page");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.code == 409) {
          toast.error(err.response.data.error);
        }
      });
  };

  const CancelHandler = () => {
    navigate("/products-page");
  };
  useEffect(() => {
    axios
      .get(`https://book-e-sell-node-api.vercel.app/api/category/all`)
      .then((res) => {
        // console.log(res);
        // console.log(res.data.result);
        // setCategories((categories) => [...categories, res.data.result]);

        setCategories(res.data.result);

        // console.log(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (bname.trim().length < 1) {
      changeBnameVal(false);
      // changeFormVal(false);
    } else {
      changeBnameVal(true);
    }
  }, [bname]);
  useEffect(() => {
    if (bprice <= 0) {
      changeBpriceVal(false);
      // changeFormVal(false);
    } else {
      changeBpriceVal(true);
    }
  }, [bprice]);
  useEffect(() => {
    if (selectedCategory === -1) {
      changeCategoryVal(false);
      // changeFormVal(false);
    } else {
      changeCategoryVal(true);
    }
  }, [selectedCategory]);
  useEffect(() => {
    if (description.length < 1) {
      changeDescVal(false);
      // changeFormVal(false);
    } else {
      changeDescVal(true);
    }
  }, [description]);
  useEffect(() => {
    if (bnameVal && descVal && bpriceVal && selectedFileVal && categoryVal) {
      setFormVal(true);
    } else {
      setFormVal(false);
    }
  });

  return (
    <>
      <div className="category-heading">
        <span>Add Book</span>
      </div>
      <div className="reg-container">
        <div className="reg-login-container">
          <form className="reg-login-form">
            <div className="reg-holder">
              {/*  Book Name Section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="bname">
                  Book Name
                </label>
                <input
                  type="text"
                  id="bname"
                  name="name"
                  className={bnameVal ? "textBox" : "textBox red-textBox"}
                  onChange={(e) => setBname(e.target.value)}
                ></input>
              </div>
              {/*  Book price */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="bprice">
                  Book Price
                </label>
                <input
                  type="number"
                  onChange={(e) => setBprice(e.target.value)}
                  id="bprice"
                  name="price"
                  className={bpriceVal ? "textBox" : "textBox red-textBox"}
                ></input>
              </div>
            </div>

            <div className="reg-holder">
              {/*File picker */}
              <div className="reg-sub-holder">
                <label
                  className="reg-form-label"
                  htmlFor="image"
                  // multiple="false"
                >
                  Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  id="image"
                  name="base64image"
                  className={
                    selectedFileVal ? "textBox" : "textBox red-textBox"
                  }
                ></input>
              </div>
              {/* Role section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="categoryId"
                  className={categoryVal ? "textBox" : "textBox red-textBox"}
                  onChange={(e) => setSelectedCategories(e.target.value)}
                  defaultValue={-1}
                >
                  <option value={-1}>Choose one</option>
                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="reg-holder">
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: "950.2px", height: "87.5px" }}
                  className={descVal ? "textBox" : "textBox red-textBox"}
                ></input>
              </div>
            </div>
            <div className="reg-holder">
              <div className="reg-sub-holder">
                {formVal ? (
                  <GreenButton
                    buttonText="Save"
                    onClick={SaveHandler}
                  ></GreenButton>
                ) : (
                  <h3 style={{ color: "red" }}>Invalid Details</h3>
                )}
              </div>
              <div className="reg-sub-holder">
                <RedButton
                  buttonText="Cancel"
                  onSubmit={CancelHandler}
                ></RedButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBook;
