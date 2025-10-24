document.addEventListener("DOMContentLoaded", function () {
  let products = [];

  const showFormBtn = document.getElementById("showAddFormBtn");
  const addProductFormSection = document.getElementById("addProductForm");
  const addProductForm = addProductFormSection.querySelector("form");
  const cancelAddBtn = document.getElementById("cancelAddBtn");
  const formError = document.getElementById("formError");
  const productList = document.querySelector(".product-list");
  const searchInput = document.getElementById("searchInput");

  setupEventListeners();
  loadProductsFromStorage();

  function setupEventListeners() {
    // Show/ Hide form
    showFormBtn.addEventListener("click", function () {
      addProductFormSection.classList.toggle("hidden");
      updateFormButtonText();

      if (!addProductFormSection.classList.contains("hidden")) {
        addProductFormSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    cancelAddBtn.addEventListener("click", function () {
      hideAndResetForm();
    });

    // Search product
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const allProducts = document.querySelectorAll(".product-item");

      allProducts.forEach(function (product) {
        const productName = product
          .querySelector("h3")
          .textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
          product.style.display = "flex";
        } else {
          product.style.display = "none";
        }
      });
    });

    addProductForm.addEventListener("submit", function (event) {
      event.preventDefault();
      handleAddNewProduct();
    });
  }

  function loadProductsFromStorage() {
    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {
      products = JSON.parse(savedProducts);
    } else {
      products = [
        {
          name: 'Sách "Cuộc Phiêu Lưu Ký"',
          desc: "Một cuốn tiểu thuyết phiêu lưu mạo hiểm đầy hấp dẫn và lôi cuốn.",
          price: 150000,
        },
        {
          name: 'Sách "Lập Trình Cơ Bản"',
          desc: "Hướng dẫn nhập môn lập trình cho người mới bắt đầu, dễ hiểu.",
          price: 220000,
        },
        {
          name: 'Sách "Nghệ Thuật Nấu Ăn"',
          desc: "Bí quyết để tạo ra những món ăn ngon miệng cho gia đình bạn.",
          price: 180000,
        },
      ];
      saveProductsToStorage();
    }

    renderProductList();
  }

  function saveProductsToStorage() {
    localStorage.setItem("products", JSON.stringify(products));
  }

  function renderProductList() {
    productList.innerHTML = "";
    products.forEach((product) => {
      const newProductElement = createProductElement(
        product.name,
        product.desc,
        product.price
      );
      productList.appendChild(newProductElement);
    });
  }

  // handle create new product
  function handleAddNewProduct() {
    const name = document.getElementById("newProductName").value.trim();
    const priceInput = document.getElementById("newProductPrice").value.trim();
    const desc = document.getElementById("newProductDesc").value.trim();

    // Validate
    const price = parseFloat(priceInput);
    if (name === "" || desc === "") {
      showError("Tên sản phẩm và Mô tả không được để trống.");
      return;
    }

    if (isNaN(price) || price <= 0) {
      showError("Giá sản phẩm phải là một số dương hợp lệ.");
      return;
    }

    clearError();

    const newProduct = {
      name: name,
      desc: desc,
      price: price,
    };

    products.unshift(newProduct);

    // save new
    saveProductsToStorage();
    renderProductList();
    hideAndResetForm();
  }

  function createProductElement(name, desc, price) {
    const article = document.createElement("article");
    article.className = "product-item";

    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

    article.innerHTML = `
          <img src="https://placehold.co/400x200/eee/888?text=${encodeURIComponent(
            name
          )}" alt="Bìa sách ${name}">
          <h3>${name}</h3>
          <p>${desc}</p>
          <p class="price">Giá: ${formattedPrice}</p>
      `;

    return article;
  }

  function hideAndResetForm() {
    addProductForm.reset();
    addProductFormSection.classList.add("hidden");
    formError.textContent = "";
    formError.style.display = "none";
    updateFormButtonText();
  }

  function updateFormButtonText() {
    if (addProductFormSection.classList.contains("hidden")) {
      showFormBtn.textContent = "Thêm sản phẩm mới";
    } else {
      showFormBtn.textContent = "Đóng Form";
    }
  }

  function showError(message) {
    formError.textContent = message;
    formError.style.display = "block";
  }

  function clearError() {
    formError.textContent = "";
    formError.style.display = "none";
  }
});
