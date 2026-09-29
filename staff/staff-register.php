<?php

session_start();

include('../dbconnect.php');

$error = "";

if (isset($_POST['registerButton'])) {

    $staffID = trim($_POST['staffID']);
    $username = trim($_POST['staffUsername']);
    $password = $_POST['staffPassword'];
    $confirmPassword = $_POST['confirmPassword'];

    // Check if passwords match
    if ($password !== $confirmPassword) {

        $error = "password_mismatch";

    } else {

        // Check if Staff ID already exists
        $query = "SELECT staff_id FROM staff WHERE staff_id = '$staffID'";

        $result = mysqli_query($conn, $query);

        if (!$result) {

            $error = "registration_failed";

        } elseif (mysqli_num_rows($result) > 0) {

            $error = "staff_exists";

        } else {

            // Check if username already exists
            $query = "SELECT username FROM staff WHERE username = '$username'";

            $result = mysqli_query($conn, $query);

            if (!$result) {

                $error = "registration_failed";

            } elseif (mysqli_num_rows($result) > 0) {

                $error = "username_exists";

            } else {

                // Register staff
                $query = "INSERT INTO staff(staff_id, username, password)
                          VALUES('$staffID', '$username', '$password')";

                $result = mysqli_query($conn, $query);

                if ($result) {

                    header('Location: staff-login.php?success=registered');
                    exit();

                } else {

                    $error = "registration_failed";
                }
            }
        }
    }
}

?>


<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>MediQueue | Staff Registration</title>

    <link rel="stylesheet" href="staff-register.css">

</head>


<body>

    <main class="login-page">

        <section class="login-card">

            <a href="../index.html" class="brand">

                <span class="brand-mark">+</span>

                Medi<span>Queue</span>

            </a>


            <div class="login-header">

                <div class="staff-icon">👨‍⚕️</div>

                <h1>Staff Registration</h1>

                <p>
                    Create a staff account for the MediQueue dashboard.
                </p>

            </div>


            <form
                id="staffRegisterForm"
                method="POST"
                action="staff-register.php"
            >


                <div class="form-group">

                    <label for="staffID">
                        Staff ID
                    </label>

                    <input
                        type="text"
                        id="staffID"
                        name="staffID"
                        placeholder="Enter staff ID"
                        autocomplete="username"
                        required
                    >

                </div>


                <div class="form-group">

                    <label for="staffUsername">
                        Username
                    </label>

                    <input
                        type="text"
                        id="staffUsername"
                        name="staffUsername"
                        placeholder="Enter username"
                        required
                    >

                </div>


                <div class="form-group">

                    <label for="staffPassword">
                        Password
                    </label>

                    <div class="password-wrapper">

                        <input
                            type="password"
                            id="staffPassword"
                            name="staffPassword"
                            placeholder="Enter password"
                            required
                        >

                        <button
                            type="button"
                            id="togglePassword"
                            class="toggle-password"
                        >
                            Show
                        </button>

                    </div>

                </div>


                <div class="form-group">

                    <label for="confirmPassword">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        required
                    >

                </div>


                <p
                    id="registerError"
                    class="login-error"
                >

                    <?php

                    if ($error === "staff_exists") {
                        echo "That Staff ID already exists.";
                    }

                    if ($error === "username_exists") {
                        echo "That username already exists.";
                    }

                    if ($error === "password_mismatch") {
                        echo "Your passwords do not match.";
                    }

                    if ($error === "registration_failed") {
                        echo "Registration failed. Please try again.";
                    }

                    ?>

                </p>


                <button
                    type="submit"
                    name="registerButton"
                    class="login-button"
                >
                    Create Account
                </button>


            </form>


            <div class="login-footer">

                <a href="staff-login.php">
                    Already have an account? Sign in
                </a>

            </div>


        </section>

    </main>


    <script src="staff-register.js"></script>

</body>

</html>