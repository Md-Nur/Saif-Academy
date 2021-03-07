<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="mono.png">

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
            background-position: center;
        }

        .htitle {
            padding: 20px 5%;
            margin: 20px 5%;
            border-radius: 10px;
            background-color: rgba(00, 0, 0, 0.5);
            color: white;
            text-align: center;
        }

        form {
            padding: 20px 5%;
            margin: 20px 5%;
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

        footer{
            text-align: center;
            color: white;
            padding: 20px 2%;
            background-color: rgba(00, 0, 0, 0.7);
        }
     </style>
     <!-- My Css -->

        <title>Payment</title>
</head>

    <body>
     <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <a class="navbar-brand" href="#">
            <img src="logo.png" width="50" height="50" alt="Payment" loading="lazy">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="index.php">Home</a>
                </li>
               
               <li class="nav-item active dropdown">
                    <a class="nav-link dropdown-toggle" href="#more" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Batch</a>
                     <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" target="_blank" href="ssc_1.php">SSC 1</a>
                        <a class="dropdown-item" target="_blank" href="ssc_2.php">SSC 2</a>
                        <a class="dropdown-item" target="_blank" href="ssc_3.php">SSC 3</a>
                        <a class="dropdown-item" target="_blank" href="hsc_first_year_1.php">HSC First Year 1</a>
                        <a class="dropdown-item" target="_blank" href="hsc_first_year_2.php">HSC First Year 2</a>
                        <a class="dropdown-item" target="_blank" href="hsc_first_year_3.php">HSC First Year 3</a>
                        <a class="dropdown-item" target="_blank" href="hsc_second_year_1.php">HSC Second Year 1</a>
                        <a class="dropdown-item" target="_blank" href="hsc_second_year_2.php">HSC Second Year 2</a>
                        <a class="dropdown-item" target="_blank" href="hsc_second_year_3.php">HSC Second Year 3</a>
                        <a class="dropdown-item" target="_blank" href="ssc_new_1.php">SSC New 1</a>
                        <a class="dropdown-item" target="_blank" href="ssc_new_2.php">SSC New 2</a>
                        <a class="dropdown-item" target="_blank" href="ssc_new_3.php">SSC New 3</a>
                    <a class="dropdown-item" target="_blank" href="hsc_first_year_new_1.php">HSC First Year New 1</a>
                     <a class="dropdown-item" target="_blank" href="hsc_first_year_new_2.php">HSC First Year New 2</a>
                    <a class="dropdown-item" target="_blank" href="hsc_first_year_new_3.php">HSC First Year New 3</a>
                   <a class="dropdown-item" target="_blank" href="hsc_second_year_new_1.php">HSC Second Year New 1</a>
                   <a class="dropdown-item" target="_blank" href="hsc_second_year_new_2.php">HSC Second Year New 2</a>
                   <a class="dropdown-item" target="_blank" href="hsc_second_year_new_3.php">HSC Second Year New 3</a>
                       <a class="dropdown-item" target="_blank" href="other.php">Other</a>           
                        </div>              
                </li>

                <li class="nav-item active dropdown">
                    <a class="nav-link dropdown-toggle" href="#more" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        More
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" target="_blank" href="https://www.facebook.com/groups/2630917767155071/">SSC Facebook Group</a>
                        <a class="dropdown-item" target="_blank" href="https://www.facebook.com/groups/265608491419819/">HSC Facebook Group</a>
                        <a class="dropdown-item" target="_blank" href="form.php">Registration</a>
                        <a class="dropdown-item" target="_blank" href="https://www.facebook.com/md.fias.1">Teacher's
                            Facebook</a>
                        <a class="dropdown-item" target="_blank" href="https://www.facebook.com/Md.NurEAlamSiddiquee/">Developer's Facebook</a>
                    </div>
                </li>
            </ul>

        </div>
    </nav>




 <?php
    if (isset($_REQUEST['submit'])) {

        $nam = $_REQUEST['nam'];
        $idn = $_REQUEST['idn'];
        $bh = $_REQUEST['bh'];
        $pmd = $_REQUEST['pmd'];
        $pn = $_REQUEST['pn'];
        $pmh = $_REQUEST['pmh'];
        $at = $_REQUEST['at'];

        //Data base connection
        $dbc1 = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        // data base connection

        if ($dbc1 = false) {
            echo 'Data base did not connected';
        }

        $q1 = "INSERT INTO `payment` (`Name`, `Roll`, `Batch`, `Payment Number`, `Payment Method`, `Payment Month`, `Amount`, `Payment time`) VALUES ('$nam', '$idn', '$bh', '$pn', '$pmd', '$pmh', '$at', current_timestamp());";

        $r1 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $q1);



        echo "<h1 class='htitle'>";
        if($r1=true){
            echo "Your payment data is inserted";
        } else {
            echo "Your data is not inseted";
        }
        echo "</h1>";
    };

    ?>





        
    <form action='' method='post'>
        <h2 style="text-align:center; color:white">Payment Form:</h2><br>
        <div class="form-group">
            <label for="inputAddress">Your Name</label>
            <input type="text" name='nam' class="form-control" required placeholder="Enter your name">
        </div>
        <div class="form-group">
            <label for="inputAddress">Your Roll Number</label>
            <input type="Number" name='idn' class="form-control" required placeholder="Roll Number">
        </div>

         <div class="form-group">
            <label for="exampleFormControlSelect1">Batch</label>
            <select class="form-control" name='bh' id="exampleFormControlSelect1">
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


       <div class="form-group">
            <label for="exampleFormControlSelect1">Payment From</label>
            <select class="form-control" name='pmd' id="exampleFormControlSelect1">
                <option>Select Payment Method</option>
                <option>Bkash</option>
                <option>Rocket</option>
                <option>Cash</option>
            </select>
        </div> 


        <div class="form-group">
            <label>Payment from which number</label>
            <input type="Number" name='pn' class="form-control" required placeholder="From which number you have paid" maxlength="11" size="11">
        </div>



 
        <div class="form-group">
            <label for="exampleFormControlSelect1">Payment month</label>
            <select class="form-control" name='pmh' id="exampleFormControlSelect1">
                <option>Select Payment Month</option>
                <option>January</option>
                <option>Ferbruary</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
            </select>
        </div>

        <div class="form-group">
            <label for="inputAddress">Amount</label>
            <input type="Number" name='at' class="form-control">
        </div>
        
        <input type="submit" name='submit' class="btn btn-outline-light">
        <input type="reset" class="btn btn-outline-danger" value='Clear'><br>
    </form>




 <footer>
        Copyright &copy All right reserved by Saif Academy<br> Developed by Md. Nur E Alam
            Siddiquee <br>
            Bkash Number: 01824851426<br>
            Rocket Number: 015526361856<br>
            Bkash Number: 01552636185

        
</footer>


 <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
    </script>
    <!-- Optional JavaScript -->
    </body>

</html>
