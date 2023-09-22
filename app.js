// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi7xnLUtV_uuY1ifeesFQ_knLWu5KirgU",
  authDomain: "kyc-registration-form.firebaseapp.com",
  databaseURL: "https://kyc-registration-form-default-rtdb.firebaseio.com",
  projectId: "kyc-registration-form",
  storageBucket: "kyc-registration-form.appspot.com",
  messagingSenderId: "5806046345",
  appId: "1:5806046345:web:abd9bb8ac8129a082e1a58",
  measurementId: "G-YD542SM6XB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Create Firebase Realtime Database reference
let messageRef = firebase.database().ref("messages");

// Listening for form submit
document.getElementById("control-from").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Get values from the form
  let name = getInputValue("name");
  let email = getInputValue("email");
  let message = getInputValue("Message");
  let fatherName = getInputValue("fatherName");
  let residentialStatus = getInputValue("residentialStatus");
  let pan = getInputValue("pan");
  let aadhaar = getInputValue("aadhaar");
  let localAddress = getInputValue("localAddress");
  let phone = getInputValue("phone");
  let maritalStatus = getInputValue("maritalStatus");
  let dob = getInputValue("dob");
  let gender = getInputValue("gender");
  let photo = getInputValue("photo");

  // Save data to Firebase
  saveMessage(
    name,
    email,
    message,
    fatherName,
    residentialStatus,
    pan,
    aadhaar,
    localAddress,
    phone,
    maritalStatus,
    dob,
    gender,
    photo
  );

  // Show alert
  document.querySelector(".alert").style.display = "block";

  // Hide alert after 3 seconds
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Clear form
  document.getElementById("control-from").reset();
}

// Function to get form field value by ID
function getInputValue(id) {
  const element = document.getElementById(id);
  if (element) {
    return element.value;
  } else {
    console.error(`Element with id '${id}' not found.`);
    return null;
  }
}

// Function to save data to Firebase
function saveMessage(
  name,
  email,
  message,
  fatherName,
  residentialStatus,
  pan,
  aadhaar,
  localAddress,
  phone,
  maritalStatus,
  dob,
  gender,
  photo
) {
  let newMessageRef = messageRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    message: message,
    fatherName: fatherName,
    residentialStatus: residentialStatus,
    pan: pan,
    aadhaar: aadhaar,
    localAddress: localAddress,
    phone: phone,
    maritalStatus: maritalStatus,
    dob: dob,
    gender: gender,
    photo: photo,
  });
}

// Disable right-click to prevent copying of content
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Disable text selection to prevent copying of content
document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});

// Disable inspect element to protect your code
document.onkeydown = function (e) {
  if (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 73)) {
    return false;
  }
};

// Protect against clickjacking attacks
if (top !== self) {
  top.location = self.location;
}

// Sanitize user inputs (e.g., name, father's name, etc.) to prevent XSS attacks
function sanitizeInput(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Add event listener to sanitize user inputs before submission
document
  .getElementById("control-from")
  .addEventListener("submit", function (e) {
    const name = document.getElementById("name");
    const fatherName = document.getElementById("fatherName");
    const residentialStatus = document.getElementById("residentialStatus");
    const pan = document.getElementById("pan");
    const aadhaar = document.getElementById("aadhaar");
    const localAddress = document.getElementById("localAddress");
    const phone = document.getElementById("phone");
    const dob = document.getElementById("dob");

    // Sanitize user inputs
    name.value = sanitizeInput(name.value);
    fatherName.value = sanitizeInput(fatherName.value);
    residentialStatus.value = sanitizeInput(residentialStatus.value);
    pan.value = sanitizeInput(pan.value);
    aadhaar.value = sanitizeInput(aadhaar.value);
    localAddress.value = sanitizeInput(localAddress.value);
    phone.value = sanitizeInput(phone.value);
    dob.value = sanitizeInput(dob.value);
  });

// Ensure the photo upload is allowed only for certain file types (e.g., images)
document.getElementById("photo").addEventListener("change", function (e) {
  const fileInput = e.target;
  if (fileInput.files.length > 0) {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileName = fileInput.files[0].name;
    const fileExtension = fileName.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert("Please upload a valid image file (e.g., JPG, JPEG, PNG, GIF).");
      fileInput.value = ""; // Clear the file input
    }
  }
});

// Regular expressions for validation
const aadhaarRegex = /^\d{12}$/; // 12-digit numeric format
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/; // Format: ABCDE1234F (Uppercase letters and digits)
const phoneRegex = /^\d{10}$/; // 10-digit numeric format

// Function to validate Aadhaar number
function isValidAadhaar(aadhaar) {
  return aadhaarRegex.test(aadhaar);
}

// Function to validate PAN number
function isValidPAN(pan) {
  return panRegex.test(pan);
}

// Function to validate phone number
function isValidPhoneNumber(phone) {
  return phoneRegex.test(phone);
}

// Add event listener to validate Aadhaar number
document.getElementById("aadhaar").addEventListener("blur", function (e) {
  const aadhaarInput = e.target;
  const aadhaarValue = aadhaarInput.value;

  if (!isValidAadhaar(aadhaarValue)) {
    alert("Please enter a valid 12-digit Aadhaar number.");
    aadhaarInput.value = ""; // Clear the input
  }
});

// Add event listener to validate PAN number
document.getElementById("pan").addEventListener("blur", function (e) {
  const panInput = e.target;
  const panValue = panInput.value.toUpperCase(); // Convert to uppercase for validation

  if (!isValidPAN(panValue)) {
    alert("Please enter a valid PAN number in the format ABCDE1234F.");
    panInput.value = ""; // Clear the input
  }
});

// Add event listener to validate phone number
document.getElementById("phone").addEventListener("blur", function (e) {
  const phoneInput = e.target;
  const phoneValue = phoneInput.value;

  if (!isValidPhoneNumber(phoneValue)) {
    alert("Please enter a valid 10-digit phone number.");
    phoneInput.value = ""; // Clear the input
  }
});

// Function to handle photo preview
document.getElementById("photo").addEventListener("change", function () {
  const fileInput = this;
  const previewImage = document.getElementById("photo-preview");
  const removePhotoBtn = document.getElementById("remove-photo-btn");

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
      removePhotoBtn.style.display = "block";
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
});

// Function to handle photo removal
document
  .getElementById("remove-photo-btn")
  .addEventListener("click", function () {
    const fileInput = document.getElementById("photo");
    const previewImage = document.getElementById("photo-preview");
    const removePhotoBtn = document.getElementById("remove-photo-btn");

    fileInput.value = ""; // Clear the file input
    previewImage.src = ""; // Clear the preview image
    previewImage.style.display = "none";
    removePhotoBtn.style.display = "none";
  });

// Initialize Firebase Storage
const storage = firebase.storage();

// Function to handle photo upload
function handlePhotoUpload(file) {
  const storageRef = storage.ref();

  // Create a reference to the location where you want to store the file in Firebase Storage
  const photoRef = storageRef.child(`photos/${file.name}`);

  // Upload the file to Firebase Storage
  const uploadTask = photoRef.put(file);

  // Listen for state changes, errors, and completion of the upload
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Handle progress (optional)
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% complete`);
    },
    (error) => {
      // Handle errors (e.g., unable to upload the file)
      console.error("Error uploading photo:", error);
    },
    () => {
      // Handle successful upload
      console.log("Upload complete!");

      // Get the download URL of the uploaded photo
      photoRef.getDownloadURL().then((downloadURL) => {
        // Save the download URL in the Firebase Realtime Database along with other form data
        saveMessage(
          name,
          email,
          message,
          fatherName,
          residentialStatus,
          pan,
          aadhaar,
          localAddress,
          phone,
          maritalStatus,
          dob,
          gender,
          downloadURL
        );
      });
    }
  );
}

// Add an event listener to the photo input element
document.getElementById("photo").addEventListener("change", function (e) {
  const fileInput = e.target;

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    handlePhotoUpload(file);
  }
});
