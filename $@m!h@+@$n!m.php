<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="mono.png">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <!-- My Css -->
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            background-image: url("background.jpg");
            background-attachment: fixed;
            background-size: cover;
        }

        .title {
            padding: 20px 5%;
            background-color: rgba(00, 0, 0, 0.5);
            text-align: center;
            color: white;
        }

        form {
            padding: 15px 5%;
            margin: 5px 5%;
            border-radius: 10px;
            background-color: rgba(00, 0, 0, 0.5);
        }

        form>div>label {
            color: white;
        }

        .form-control:focus {
            color: white;
            background-color: rgba(00, 00, 00, 0.8)
        }

        .result {
            color: white;
            background-color: black;
            font-size: 25px;
            text-align: center;
            margin: 5px;
            padding: 5px;
        }
        .htitle {
            padding: 20px 3%;
            margin: 20px 3%;
            border-radius: 10px;
            background-color: rgba(00, 0, 0, 0.5);
            color: white;
        }
    </style>
    <title>Control</title>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <a class="navbar-brand" href="#">
            <img src="logo.png" width="50" height="50" alt="Control" loading="lazy">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="index.php">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="#show">Show</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link active" href="#vo">Video</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link active" href="#sc">School / College</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link active" href="#ne">Notice</a>
                </li>
                 <li class="nav-item">
                    <a class="nav-link active" href="#xm">Exam</a>
                </li> 
                <li class="nav-item">
                    <a class="nav-link active" href="#at">About</a>
                </li>
               

                <li class="nav-item dropdown">
                    <a class="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Database's Table
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="form.php">Registration</a>
                        <a class="dropdown-item" href="payment.php">Payment</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>

<!--Data-->

<h2 class="title" id="show">Show data</h2><br>

<?php
    if (isset($_REQUEST['s0'])) {

        $rr0 = $_REQUEST['rr0'];

        //Data base connection
        $dbc0 = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        // data base connection

        if ($dbc0 = false) {
            echo 'Data base did not connected';
        }

        $q0 = "SELECT * FROM `all info` WHERE `Roll` = $rr0";

        $r0 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $q0);



        echo "<h5 class='htitle'>";

        $c0 = mysqli_num_rows($r0);
        if ($c0 > 0) {
       echo "Info: <hr>" ;
            while ($row = mysqli_fetch_row($r0)) {

            
            echo "Roll: ";
            echo "{$row[0]}";
            echo "<br>";
            

            echo "Name: ";
            echo "{$row[1]}";
            echo "<br>";
                        
            echo "Phone: ";
            echo "{$row[2]}";
            echo "<br>";
                        
            echo "Email: ";
            echo "{$row[3]}";
            echo "<br>";
                        
            echo "Password: ";
            echo "{$row[4]}";
            echo "<br>";
                        
            echo "School / College: ";
            echo "{$row[5]}";
            echo "<br>";
                        
            echo "Batch: ";
            echo "{$row[6]}";
            echo "<br>";
                        
            echo "Gender: ";
            echo "{$row[7]}";
            echo "<br>";
                        
            echo "Joining Date: ";
            echo "{$row[8]}";
            echo "<br>";
           }

        }else {
            echo "There have no person with this roll";
        };


       
        echo "</h5>";
    };

    ?>





<form id = "sw" action='' method='post'>
        <div class="form-group">
            <label>Roll Number</label>
            <input type="Number" required name='rr0' class="form-control" required placeholder="Enter your roll" maxlength="11" size="11">
        </div>

        <input type="submit" value="Show my data" name='s0' class="btn btn-outline-light">
        <input type="reset" class="btn btn-outline-danger" value='Clear'><br>
    </form> 
    <br>




    <!-- video -->
    <!-- Video upload -->
    <h2 class="title" id="vo">Video</h2><br>
    <?php

    if (isset($_REQUEST['s1'])) {
        $input = $_REQUEST['l1'];

        //Data base connection
       $c1= mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        // data base connection

        if ($c1 = false) {
            echo 'Data base did not connected';
        }

        $q1 = "INSERT INTO `youtube videos`(`Link`) VALUES ('$input')";

        //database
        $r1 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $q1); //database
        //database

        if ($r1 = true) {
            echo '<p class="result">';
            echo 'Your video was uploaded';
            echo '</p>';
        } else {
            echo '<p class="result">';
            echo 'Error code 124';
            echo '</p>';
        }
    }

    ?>

    <form action='' method='post'>
        <div class="form-group">
            <label for="inputAddress">Give your new video link</label>
            <input type="text" name='l1' class="form-control" required>
        </div>
        <input type="submit" name='s1' class="btn btn-outline-light" value='Upload'>
        <input type="reset" class="btn btn-outline-danger" value='Clear'><br>
    </form>




    <!-- video delete -->
    <?php

    if (isset($_REQUEST['s2'])) {
        $input = $_REQUEST['l2'];

        //Data base connection
        $dbc1 = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        // data base connection

        if ($dbc1 = false) {
            echo 'Data base did not connected';
        }

        $q1 = "DELETE FROM `youtube videos` WHERE Link='$input'";

        //database

        $r1 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $q1); //database

        //database

        if ($r1 = true) {
            echo '<p class="result">';
            echo 'Your video was deleted';
            echo '</p>';
        } else {
            echo '<p class="result">';
            echo 'Error code 174';
            echo '</p>';
        }
    }

    ?>

    <form action='' method='post'>
        <div class="form-group">
            <label for="inputAddress">Give your video link</label>
            <input type="text" name='l2' class="form-control" required>
        </div>
        <input type="submit" name='s2' class="btn btn-outline-light" value='Delete'>
        <input type="reset" class="btn btn-outline-danger" value='Clear'><br>
    </form><br><br><br>

    <!-- school colege name -->

    <!-- add school college -->
    <h2 class="title" id="sc">School / College</h2><br>
    <?php

    if (isset($_REQUEST['s3'])) {
        $input = $_REQUEST['l3'];

        //Data base connection
        $c3 = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        // data base connection

        if ($c3 = false) {
            echo 'Data base did not connected';
        }

        $q3 = "INSERT INTO `school/college`( `S&C`) VALUES ('$input')";

        //database
        $r3 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $q3); //database
        //database

        if ($r3 = true) {
            echo '<p class="result">';
            echo 'Your schoo/college name added';
            echo '</p>';
        } else {
            echo '<p class="result">';
            echo 'Error code 250';
            echo '</p>';
        }
    }

    ?>

    <form action='' method='post'>
        <div class="form-group">
            <label for="inputAddress">Give your school / college name</label>
            <input type="text" name='l3' class="form-control" required>
        </div>
        <input type="submit" name='s3' class="btn btn-outline-light" value='Add'>
        <input type="reset" class="btn btn-outline-danger" value='Clear'><br>
    </form>




    <!-- 4. School College delete -->
    <?php

    if (isset($_REQUEST['s4'])) {
        $input = $_REQUEST['l4'];

        //Data base connection
        $c4 = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        // data base connection

        if ($c4 = false) {
            echo 'Data base did not connected';
        }

        $q4 = "DELETE FROM `school/college` WHERE `S&C` = '$input'";

        //database

        $r4 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $q4); //database

        //database

        if ($r4 = true) {
            echo '<p class="result">';
            echo 'Your School/College Removed';
            echo '</p>';
        } else {
            echo '<p class="result">';
            echo 'Error code 298';
            echo '</p>';
        }
    }

    ?>

    <form action='' method='post'>
        <div class="form-group">
            <label for="inputAddress">Give your school / college name to remove</label>
            <input type="text" name='l4' class="form-control" required>
        </div>
        <input type="submit" name='s4' class="btn btn-outline-light" value='Remove'>
        <input type="reset" class="btn btn-outline-danger" value='Clear'><br>
    </form><br><br><br>

    <!-- Notice -->

    <h2 class="title" id="ne">Notice</h2><br>

    <?php

    if (isset($_REQUEST['s5'])) {
        $input = $_REQUEST['l5'];
        $i5 = $_REQUEST['bth'];

        //Data base connection
        $c5 = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        // data base connection

        if ($c5 = false) {
            echo 'Data base did not connected';
        }

        $q5 = "UPDATE `news` SET `Notice`='$input' WHERE batch = '$i5'";

        //database

        $r5 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $q5); //database

        //database

        if ($r5 = true) {
            echo '<p class="result">';
            echo 'Your notice was updated';
            echo '</p>';
        } else {
            echo '<p class="result">';
            echo 'Error code 317';
            echo '</p>';
        }
    }

    ?>

    <form action='' method='post'>
        <div class="form-group">
            <label for="inputAddress">Write Your Notice</label>
            <textarea class="form-control" name="l5" id="exampleFormControlTextarea1"></textarea>
        </div>
        <div class="form-group">
            <label for="exampleFormControlSelect1">Batch</label>
            <select class="form-control" name='bth' id="exampleFormControlSelect1">
                <option>Select Your Batch</option>
                <option>Home</option>
                <option>SSC 1</option>
                <option>SSC 2</option>
                <option>SSC 3</option>
                <option>SSC New 1</option>
                <option>SSC New 2</option>
                <option>SSC New 3</option>
                <option>HSC First Year 1</option>
                <option>HSC First Year 2</option>
                <option>HSC First Year 3</option>
                <option>HSC First Year New 1</option>
                <option>HSC First Year New 2</option>
                <option>HSC First Year New 3</option>
                <option>HSC Second Year 1</option>
                <option>HSC Second Year 2</option>
                <option>HSC Second Year 3</option>
                <option>HSC Second Year New 1</option>
                <option>HSC Second Year New 2</option>
                <option>HSC Second Year New 3</option>
                <option>Other</option>
            </select>
        </div>
        <input type="submit" name='s5' class="btn btn-outline-light" value="Update">
        <input type="reset" class="btn btn-outline-danger" value='Clear'><br>
    </form>



<br><br>

     <!-- Exam -->

    <h2 class="title" id="xm">Exam</h2><br>

    <?php

    if (isset($_REQUEST['s6'])) {
        $it = $_REQUEST['it6'];
        $i6 = $_REQUEST['bth'];

        //Data base connection
        $c6 = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        // data base connection

        if ($c6 = false) {
            echo 'Data base did not connected';
        }

        $q6 = "UPDATE `news` SET `Exam`='$it' WHERE batch = '$i6'";

        //database

        $r6 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $q6); //database

        //database

        if ($r6 = true) {
            echo '<p class="result">';
            echo 'Your google form was updated';
            echo '</p>';
        } else {
            echo '<p class="result">';
            echo 'Error code 388';
            echo '</p>';
        }
    }

    ?>

    <form action='' method='post'>
        <div class="form-group">
            <label for="inputAddress">Enter your google form link</label>
            <textarea class="form-control" name="it6" id="exampleFormControlTextarea1"></textarea>
        </div>
        <div class="form-group">
            <label for="exampleFormControlSelect1">Batch</label>
            <select class="form-control" name='bth' id="exampleFormControlSelect1">
                <option>Select Your Batch</option>
                <option>SSC 1</option>
                <option>SSC 2</option>
                <option>SSC 3</option>
                <option>SSC New 1</option>
                <option>SSC New 2</option>
                <option>SSC New 3</option>
                <option>HSC First Year 1</option>
                <option>HSC First Year 2</option>
                <option>HSC First Year 3</option>
                <option>HSC First Year New 1</option>
                <option>HSC First Year New 2</option>
                <option>HSC First Year New 3</option>
                <option>HSC Second Year 1</option>
                <option>HSC Second Year 2</option>
                <option>HSC Second Year 3</option>
                <option>HSC Second Year New 1</option>
                <option>HSC Second Year New 2</option>
                <option>HSC Second Year New 3</option>
                <option>Other</option>
            </select>
        </div>
        <input type="submit" name='s6' class="btn btn-outline-light" value="Update">
        <input type="reset" class="btn btn-outline-danger" value='Clear'>
    </form>

<!--About-->
<br>
<h2 class="title" id="at">About</h2><br>

    <?php

    if (isset($_REQUEST['s7'])) {
        $it = $_REQUEST['it7'];
        $i7 = $_REQUEST['bth'];

        //Data base connection
        $c7 = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        // data base connection

        if ($c7 = false) {
            echo 'Data base did not connected';
        }

        $q7 = "UPDATE `news` SET `About`='$it' WHERE batch = '$i7'";

        //database

        $r7 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $q7); //database

        //database

        if ($r7 = true) {
            echo '<p class="result">';
            echo 'Your info was updated';
            echo '</p>';
        } else {
            echo '<p class="result">';
            echo 'Error code 461';
            echo '</p>';
        }
    }

    ?>

    <form action='' method='post'>
        <div class="form-group">
            <label for="inputAddress">About Batch</label>
            <textarea class="form-control" name="it7" id="exampleFormControlTextarea1"></textarea>
        </div>
        <div class="form-group">
            <label for="exampleFormControlSelect1">Batch</label>
            <select class="form-control" name='bth' id="exampleFormControlSelect1">
                <option>Select Your Batch</option>
                <option>SSC 1</option>
                <option>SSC 2</option>
                <option>SSC 3</option>
                <option>SSC New 1</option>
                <option>SSC New 2</option>
                <option>SSC New 3</option>
                <option>HSC First Year 1</option>
                <option>HSC First Year 2</option>
                <option>HSC First Year 3</option>
                <option>HSC First Year New 1</option>
                <option>HSC First Year New 2</option>
                <option>HSC First Year New 3</option>
                <option>HSC Second Year 1</option>
                <option>HSC Second Year 2</option>
                <option>HSC Second Year 3</option>
                <option>HSC Second Year New 1</option>
                <option>HSC Second Year New 2</option>
                <option>HSC Second Year New 3</option>
                <option>Other</option>
            </select>
        </div>
        <input type="submit" name='s7' class="btn btn-outline-light" value="Update">
        <input type="reset" class="btn btn-outline-danger" value='Clear'>
    </form>













    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
    </script>
</body>

</html>