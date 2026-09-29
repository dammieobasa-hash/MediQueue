<?php
session_start();
include('dbconnect.php');
if(isset($_POST['loginButton'])){
	$user = $_POST['username'];
	$pass = $_POST['loginPassword'];
	$query = ("SELECT username, password FROM users WHERE username = '$user' AND password = '$pass'");
	$result = mysqli_query($conn , $query);
	$num = mysqli_num_rows($result);
	if($num > 0){
		//echo 'Valid login details';
		$_SESSION['username'] = $user; 
		header('location: index.html');
	}
	else{
		echo 'Invalid Username or Password!!!';
	}
}
?>




<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Log in to your MediQueue account" />
  <title>Log in | MediQueue</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="auth.css" />
</head>

<body>
  <main class="auth-page">
    <aside class="auth-aside">
      <a class="brand" href="index.html"><span class="brand-mark">+</span>Medi<span>Queue</span></a>
      <div class="aside-content">
        <p class="eyebrow"><span></span> CARE THAT RESPECTS YOUR TIME</p>
        <h1>Your health, <em>on your schedule.</em></h1>
        <p>Keep your appointments, queue status, and care details in one calm, simple place.</p>
      </div>
      <div class="care-note"><span>✓</span>
        <p><strong>Your information stays private.</strong><br />Protected with secure account access.</p>
      </div>
      <div class="aside-orb orb-a"></div>
      <div class="aside-orb orb-b"></div>
    </aside>
    <section class="auth-panel">
      <a class="back-link" href="index.html">← Back to MediQueue</a>
      <div class="auth-card">
        <p class="eyebrow"><span></span> WELCOME BACK</p>
        <h2>Log in to your account</h2>
        <p class="auth-intro">Enter your details to manage your care journey.</p>
         <form id="loginForm" method="POST" action="login.php">
          <label>Username<input name="username" id="username" type="text" autocomplete="username" placeholder="Enter your username"
              required /></label>
          <label>Password<div class="password-field">
            <input name="loginPassword" id="loginPassword" type="password"
                autocomplete="current-password" placeholder="Enter your password" required />
                <button type="button"
                class="password-toggle" data-toggle="loginPassword">Show</button></div></label>
          <div class="form-row"><label class="checkbox"><input name="rememberMe" type="checkbox" /> <span>Remember
                me</span></label><button class="inline-link" type="button" id="forgotPassword">Forgot password?</button>
          </div>
          <p class="form-message" id="loginMessage" role="status"></p>
          <button class="primary-button full" type="submit" id="loginButton" name="loginButton">Log in <b>→</b></button>
        </form>
        <p class="auth-switch">New to MediQueue? <a href="register.php">Create an account</a></p>
      </div>
    </section>
  </main>
   <script src="auth.js"></script> 
</body>

</html>