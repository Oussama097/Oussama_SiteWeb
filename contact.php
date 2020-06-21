<?php 

    if(isset($_POST['submit']))
    {
        $Name = $_POST['nom'];
        $Email = $_POST['email'];
        $Message = $_POST['message'];

        if(empty($Name) || empty($Email) || empty($Message)){
            header('location:index.php?error#contact');
        }
        else
        {
            $to = "oussama_hennani@hotmail.fr";

            if(mail($to,$Name,$Email,$Message))
            {
                header("location:index.php?success#contact");
            }
        }

    }
    else{
        header("location:index.php");
    }
?>