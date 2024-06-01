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

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val loginButton = findViewById<Button>(R.id.loginButton)
        loginButton.setOnClickListener {
            val userLogin = findViewById<EditText>(R.id.userLoginEditText).text.toString()
            val password = findViewById<EditText>(R.id.passwordEditText).text.toString()

            if (userLogin.isNotEmpty() && password.isNotEmpty()) {
                val user = User(
                    user_name = "",
                    user_login = userLogin,
                    user_password = password,
                    user_phone = "",
                    user_mail = "",
                    role = ""
                )
                RetrofitClient.instance.loginUser(user)
                    .enqueue(object : Callback<User> {
                        override fun onResponse(call: Call<User>, response: Response<User>) {
                            if (response.isSuccessful) {
                                Toast.makeText(this@LoginActivity, "Login successful", Toast.LENGTH_SHORT).show()
                                startActivity(Intent(this@LoginActivity, Equalize::class.java))
                                finish()
                            } else {
                                Toast.makeText(this@LoginActivity, "Login failed", Toast.LENGTH_SHORT).show()
                            }
                        }

                        override fun onFailure(call: Call<User>, t: Throwable) {
                            Toast.makeText(this@LoginActivity, t.message, Toast.LENGTH_SHORT).show()
                        }
                    })
            } else {
                Toast.makeText(this, "Please fill out all fields", Toast.LENGTH_SHORT).show()
            }
        }
    }
}