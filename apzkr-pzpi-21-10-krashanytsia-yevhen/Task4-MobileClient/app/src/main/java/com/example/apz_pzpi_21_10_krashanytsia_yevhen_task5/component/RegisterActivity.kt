package com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.component
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.R
import com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.api.RetrofitClient
import com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.model.User
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
class RegisterActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val registerButton = findViewById<Button>(R.id.registerButton)
        registerButton.setOnClickListener {
            val userName = findViewById<EditText>(R.id.userNameEditText).text.toString()
            val userLogin = findViewById<EditText>(R.id.userLoginEditText).text.toString()
            val password = findViewById<EditText>(R.id.passwordEditText).text.toString()
            val userPhone = findViewById<EditText>(R.id.userPhoneEditText).text.toString()
            val userMail = findViewById<EditText>(R.id.userMailEditText).text.toString()
            val role = "user" // You can change this as needed

            if (userName.isNotEmpty() && userLogin.isNotEmpty() && password.isNotEmpty() && userPhone.isNotEmpty() && userMail.isNotEmpty()) {
                val user = User(
                    user_name = userName,
                    user_login = userLogin,
                    user_password = password,
                    user_phone = userPhone,
                    user_mail = userMail,
                    role = role
                )
                RetrofitClient.instance.registerUser(user)
                    .enqueue(object : Callback<User> {
                        override fun onResponse(call: Call<User>, response: Response<User>) {
                            if (response.isSuccessful) {
                                Toast.makeText(this@RegisterActivity, "Registration successful", Toast.LENGTH_SHORT).show()
                                startActivity(Intent(this@RegisterActivity, Equalize::class.java))
                                finish()
                            } else {
                                Toast.makeText(this@RegisterActivity, "Registration failed", Toast.LENGTH_SHORT).show()
                            }
                        }

                        override fun onFailure(call: Call<User>, t: Throwable) {
                            Toast.makeText(this@RegisterActivity, t.message, Toast.LENGTH_SHORT).show()
                        }
                    })
            } else {
                Toast.makeText(this, "Please fill out all fields", Toast.LENGTH_SHORT).show()
            }
        }
    }
}