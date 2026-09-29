<?php

session_start();

include('../dbconnect.php');


// ======================================
// HANDLE STAFF LOGIN
// ======================================

if (isset($_POST['loginButton'])) {

    $staffID = trim($_POST['staffUsername']);
    $password = $_POST['staffPassword'];


    // Find staff member
    $query = "SELECT staff_id, username, password
              FROM staff
              WHERE staff_id = '$staffID'";

    $result = mysqli_query($conn, $query);


    // Database error
    if (!$result) {

        $error = "login_failed";

    } else {

        $num = mysqli_num_rows($result);


        // Staff ID found
        if ($num > 0) {

            $row = mysqli_fetch_assoc($result);


            // Check password
            if ($password === $row['password']) {

                // Create staff session
                $_SESSION['staff_id'] = $row['staff_id'];
                $_SESSION['staff_username'] = $row['username'];


                // Login successful
                header('Location: staff-dashboard.php');
                exit();

            } else {

                $error = "invalid_login";

            }

        } else {

            $error = "invalid_login";

        }

    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>MediQueue | Staff Login</title>

    <link rel="stylesheet" href="staff-login.css">

</head>


<body>

    <main class="login-page">

        <section class="login-card">


            <a href="../index.html" class="brand">

                <span class="brand-mark">+</span>

                Medi<span>Queue</span>

            </a>


            <div class="login-header">

                <div class="staff-icon">
                    👨‍⚕️
                </div>


                <h1>
                    Staff Login
                </h1>


                <p>
                    Sign in to access the MediQueue staff dashboard.
                </p>

            </div>



            <!-- STAFF LOGIN FORM -->

            <form
                id="staffLoginForm"
                method="POST"
                action="staff-login.php"
            >


                <div class="form-group">

                    <label for="staffUsername">
                        Staff ID
                    </label>


                    <input
                        type="text"
                        id="staffUsername"
                        name="staffUsername"
                        placeholder="Enter your staff ID"
                        autocomplete="username"
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
                            placeholder="Enter your password"
                            autocomplete="current-password"
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



                <p
                    id="loginError"
                    class="login-error"
                >

                    <?php

                    if (isset($error)) {

                        if ($error === "invalid_login") {

                            echo "Invalid Staff ID or password.";

                        }

                        if ($error === "login_failed") {

                            echo "Something went wrong. Please try again.";

                        }

                    }

                    ?>

                </p>



                <button
                    type="submit"
                    name="loginButton"
                    class="login-button"
                >
                    Sign in
                </button>


            </form>



            <div class="login-footer">

                <a href="../index.html">
                    ← Back to MediQueue
                </a>

            </div>


        </section>

    </main>



    <script src="staff-login.js"></script>

</body>

</html>