package com.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.dao.Stores;
import com.model.Sales;

public interface SalesFetchService {
	public ArrayList<Stores> findAll();

	public ArrayList<Stores> findAllWith();

}
