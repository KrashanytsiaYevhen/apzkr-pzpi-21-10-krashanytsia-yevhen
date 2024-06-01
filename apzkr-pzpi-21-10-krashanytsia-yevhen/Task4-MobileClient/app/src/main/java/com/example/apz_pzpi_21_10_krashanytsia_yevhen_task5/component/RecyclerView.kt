package com.example.apz_pzpi_21_10_krashanytsia_yevhen_task5.component

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class ChordsAdapter(
    private val chords: List<String>,
    private val onChordClick: (String) -> Unit
) : RecyclerView.Adapter<ChordsAdapter.ChordViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ChordViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(android.R.layout.simple_list_item_1, parent, false)
        return ChordViewHolder(view)
    }

    override fun onBindViewHolder(holder: ChordViewHolder, position: Int) {
        holder.bind(chords[position])
    }

    override fun getItemCount() = chords.size

    inner class ChordViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val textView: TextView = itemView.findViewById(android.R.id.text1)

        fun bind(chord: String) {
            textView.text = chord
            itemView.setOnClickListener {
                onChordClick(chord)
            }
        }
    }
}