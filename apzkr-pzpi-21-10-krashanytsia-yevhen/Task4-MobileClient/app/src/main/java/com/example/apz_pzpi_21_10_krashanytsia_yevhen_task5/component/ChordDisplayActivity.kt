package com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.component

import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.R

class ChordDisplayActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chord_display)

        val chordListView = findViewById<ListView>(R.id.chord_list_view)
        val chords = intent.getStringArrayListExtra("chords")

        val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, chords!!)
        chordListView.adapter = adapter

        val startLearningButton = findViewById<Button>(R.id.start_learning_button)
        startLearningButton.setOnClickListener {
            Toast.makeText(this, "Learning started", Toast.LENGTH_SHORT).show()
        }
    }
}
