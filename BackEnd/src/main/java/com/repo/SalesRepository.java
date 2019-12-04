package com.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dao.Stores;

@Repository
public interface SalesRepository extends JpaRepository<Stores, Long> {

   
	public ArrayList<Stores> findAll();
	@Query(value="SELECT * FROM SALESREPORT u where u.store_id=?1",nativeQuery=true)
	public Stores findById(long store_id);
	
	@Query(value="SELECT * FROM SALESREPORT u WHERE u.store_area = ?1",nativeQuery = true)
	public ArrayList<Stores> findByArea(String area);
	

    @Query(value="SELECT * FROM SALESREPORT u WHERE upper(u.parking) = ?1",nativeQuery = true)
    public ArrayList<Stores> findByParkingNA(String parking);

    @Query(value="SELECT * FROM SALESREPORT u WHERE upper(u.parking) = ?1 or upper(u.parking) =?2",nativeQuery = true)
    public ArrayList<Stores> findByParking(String parking1,String parking2);

    
}