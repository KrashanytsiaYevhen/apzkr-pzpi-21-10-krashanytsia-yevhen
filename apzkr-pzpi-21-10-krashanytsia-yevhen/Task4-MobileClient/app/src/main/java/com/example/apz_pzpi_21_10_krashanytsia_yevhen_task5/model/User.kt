package com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.model

data class User(
    val id: Int? = null,
    val user_name: String,
    val user_login: String,
    val user_password: String,
    val user_phone: String,
    val user_mail: String,
    val role: String
)