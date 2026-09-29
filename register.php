<?php 
include('dbconnect.php');
if(isset($_POST['submit'])){
	$user = $_POST['registerName'];
	$email = $_POST['registerEmail'];
	$pass = $_POST['registerPassword'];
	$cpass = $_POST['confirmPassword'];
	$query = ("SELECT username FROM users WHERE username = '$user'");
	$result = mysqli_query($conn , $query);
	$num = mysqli_num_rows($result);
		if($num > 0){
				echo 'OOPPSS!!! Username already exist, try another one!!!';
			}
			elseif($pass != $cpass){
				echo 'OOPPSS!!! Password does not match!!!';
			}
			else{
					$query = ("INSERT INTO users(username, email, password) VALUES('$user', '$email', '$pass')");
					$result = mysqli_query($conn , $query);
					if($result){
						echo 'SUCCESS!!! Your registration was successful!!!';
					}
					else{
						echo 'OPPSS!!! Registration failed!!!';
					}
			}
}
?>



<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Create your MediQueue account" />
  <title>Create an account | MediQueue</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="auth.css" />
</head>
<body>
  <main class="auth-page">
    <aside class="auth-aside">
      <a class="brand" href="index.html"><span class="brand-mark">+</span>Medi<span>Queue</span></a>
      <div class="aside-content">
        <p class="eyebrow"><span></span> CARE THAT RESPECTS YOUR TIME</p>
        <h1>A better way to <em>wait for care.</em></h1>
        <p>Create your account once, then join queues and receive timely updates whenever you need care.</p>
      </div>
      <div class="care-note"><span>✓</span><p><strong>Join in just a minute.</strong><br />No paperwork. No standing in line.</p></div>
      <div class="aside-orb orb-a"></div><div class="aside-orb orb-b"></div>
    </aside>
    <section class="auth-panel">
      <a class="back-link" href="index.html">← Back to MediQueue</a>
      <div class="auth-card">
        <p class="eyebrow"><span></span> CREATE YOUR ACCOUNT</p>
        <h2>Get started with MediQueue</h2>
        <p class="auth-intro">Your account helps us make every visit more seamless.</p>
        <form id="registerForm" method="POST" action="register.php">
          <label>Full name<input name="registerName" id="registerName" type="text" autocomplete="name" maxlength="60" placeholder="e.g. oluwadamilola Oni-obasa" required /></label>
          <label>Email address<input name="registerEmail" id="registerEmail" type="email" autocomplete="email" placeholder="you@example.com" required /></label>
          <label>Create a password<div class="password-field"><input name="registerPassword" id="registerPassword" type="password" autocomplete="new-password" minlength="8" placeholder="At least 8 characters" required /><button type="button" class="password-toggle" data-toggle="registerPassword">Show</button></div></label>
          <label>Confirm password<div class="password-field"><input name="confirmPassword" id="confirmPassword" type="password" autocomplete="new-password" placeholder="Re-enter your password" required /><button type="button" class="password-toggle" data-toggle="confirmPassword">Show</button></div></label>
          <label class="checkbox terms"><input name="terms" id="terms" type="checkbox" required /> <span>I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</span></label>
          <p class="form-message" id="registerMessage" role="status"></p>
          <button class="primary-button full" type="submit" id="submit" name="submit">Create account <b>→</b></button>
        </form>
        <p class="auth-switch">Already have an account? <a href="login.php">Log in</a></p>
      </div>
    </section>
  </main>
  <!-- <script src="auth.js"></script> -->
</body>
</html>
