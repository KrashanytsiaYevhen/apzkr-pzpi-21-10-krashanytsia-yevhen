package com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.component

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.R

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val registerButton = findViewById<Button>(R.id.registerButton)
        registerButton.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }

        val loginButton = findViewById<Button>(R.id.loginButton)
        loginButton.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }
}