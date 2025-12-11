package com.manh.healthcare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NutritionInfo {
    public List<String> guidance;
    public List<String> recommendedFoods;
    public List<String> foodsToAvoid;
}
