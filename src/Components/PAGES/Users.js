import React from "react";
import "../CSS/category.css";
import RedButton from "../UI/RedButton";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GreenButton from "../UI/GreenButton";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth.auth);
  const [RowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [USERS, setUSERS] = useState([]);
  const [NoMoreitems, setNoMoreItems] = useState(false);
  const [reload, setReload] = useState(1);

  function nextPage() {
    if (USERS.length === 0) {
      // setNoMoreItems(true);
      toast.error("NO MORE CATEGORIES");
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  }
  function previousPage() {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  }

  const UserEditHandler = (e) => {
    const userID = e.target.value;

    const PW = USERS.find((user) => {
      if (user.id == userID) {
        return user.password;
      }
    });

    // console.log(userID);
    // console.log(PW.password);
    // console.log(PW);

    navigate(`/edit-user/${userID}/${PW.password}`);
  };

  const UserDeletehandler = (e) => {
    const DEL = window.confirm("Are you sure?");
    if (DEL) {
      axios
        .delete(
          `https://book-e-sell-node-api.vercel.app/api/user?id=${e.target.value}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            // window.location.reload();
            if (reload == 2) {
              setReload(1);
            } else {
              setReload(2);
            }

            toast.success("User deleted!");
          }
        })

        .catch((err) => {
          console.log(err);
          toast.error("Cannot delete this user right now, SERVER ERROR!!");
        });
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://book-e-sell-node-api.vercel.app/api/user?pageSize=${RowsPerPage}&pageIndex=${currentPage}`
      )
      .then((res) => {
        // console.log(res);
        console.log(res.data.result.items);

        setUSERS(res.data.result.items);

        // console.log(USERS);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [RowsPerPage, currentPage, reload]);

  return (
    <>
      <div className="category-heading">
        <span>Users</span>
      </div>

      <div className="category-selector">
        <div className="category-selector-search">
          <input
            type="text"
            placeholder="Search"
            // onChange={searchCategoryHandler}
          ></input>
        </div>
      </div>

      <div className="category-main-table">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th></th>
            </tr>
          </thead>

          {USERS.map((user) => {
            return (
              <tbody class="table-group">
                <tr>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="editButton"
                      value={user.id}
                      data-value={user.password}
                      onClick={UserEditHandler}
                      style={{ marginLeft: "50px" }}
                    >
                      Edit
                    </button>
                    {user.role == "admin" ? (
                      <></>
                    ) : (
                      <button
                        className="deleteButton"
                        value={user.id}
                        onClick={UserDeletehandler}
                        style={{ marginLeft: "10px" }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>

      <div className="category-pagination">
        <div className="category-pagination-row-selector">
          <label style={{ marginRight: "10px" }}>Rows per page</label>
          <select
            name="rowsPerPage"
            onChange={(e) => setRowsPerPage(e.target.value)}
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10} selected>
              10
            </option>
            <option value={100}>100</option>
          </select>
        </div>
        <p>{currentPage}</p>
        <div className="category-pagination-row-display">
          <button className="less-then" onClick={previousPage}>
            &lt;
          </button>
          {NoMoreitems ? (
            <button className="greater-then" disabled>
              &gt;
            </button>
          ) : (
            <button className="greater-then" onClick={nextPage}>
              {" "}
              &gt;{" "}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
