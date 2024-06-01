package com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.component
import com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.model.User
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST
interface ApiService {
    @POST("/api/user/registration")
    fun registerUser(@Body user: User): Call<User>

    @POST("/api/user/login")
    fun loginUser(@Body user: User): Call<User>
}