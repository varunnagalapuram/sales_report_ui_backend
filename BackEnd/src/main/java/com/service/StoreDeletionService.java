package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.Stores;
import com.repo.SalesRepository;

@Service
public class StoreDeletionService implements StoreDeletionServiceInt{

	@Autowired
	SalesRepository sr;
	  public Stores deleteStoreById(long id) {
	    Stores store = sr.findById(id);

	    if (store == null)
	      return null;
	    else{
	    	sr.delete(store);
	    	return store;
	    }
	    
	  }
}
