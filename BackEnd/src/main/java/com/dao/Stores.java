package com.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SALESREPORT")
public class Stores {
	@Id
	@Column(name="store_id")
	private long store_id;
	
	private double dist_taxi,dist_market,dist_metro,items_available,daily_cust_count,store_sales;
	private String store_area;
	private String parking,coupon_category;
	/*public Sales(long id, double dist_taxi, double dist_market, double dist_metro, double items_available, double daily_cust_count,
			double store_sales, double store_area, String parking, String coupon_category) {
		
		this.id = id;
		this.dist_taxi = dist_taxi;
		this.dist_market = dist_market;
		this.dist_metro = dist_metro;
		this.items_available = items_available;
		this.daily_cust_count = daily_cust_count;
		this.store_sales = store_sales;
		this.store_area = store_area;
		this.parking = parking;
		this.coupon_category = coupon_category;
	}*/
	public Stores(){
		this.store_id = 0;
		this.dist_taxi = 0;
		this.dist_market = 0;
		this.dist_metro = 0;
		this.items_available = 0;
		this.daily_cust_count = 0;
		this.store_sales = 0;
		this.store_area = "";
		this.parking = "";
		this.coupon_category = "";
	}
	public long getStore_id() {
		return store_id;
	}
	public void setStore_id(long store_id) {
		this.store_id = store_id;
	}
	public double getDist_taxi() {
		return dist_taxi;
	}
	public void setDist_taxi(double dist_taxi) {
		this.dist_taxi = dist_taxi;
	}
	public double getDist_market() {
		return dist_market;
	}
	public void setDist_market(double dist_market) {
		this.dist_market = dist_market;
	}
	public double getDist_metro() {
		return dist_metro;
	}
	public void setDist_metro(double dist_metro) {
		this.dist_metro = dist_metro;
	}
	public double getItems_available() {
		return items_available;
	}
	public void setItems_available(double items_available) {
		this.items_available = items_available;
	}
	public double getDaily_cust_count() {
		return daily_cust_count;
	}
	public void setDaily_cust_count(double daily_cust_count) {
		this.daily_cust_count = daily_cust_count;
	}
	public double getStore_sales() {
		return store_sales;
	}
	public void setStore_sales(double store_sales) {
		this.store_sales = store_sales;
	}
	public String getStore_area() {
		return store_area;
	}
	public void setStore_area(String store_area) {
		this.store_area = store_area;
	}
	public String getParking() {
		return parking;
	}
	public void setParking(String parking) {
		this.parking = parking;
	}
	public String getCoupon_category() {
		return coupon_category;
	}
	public void setCoupon_category(String coupon_category) {
		this.coupon_category = coupon_category;
	}
    @Override
	public String toString() {
		return "Sales [id=" + store_id + ", dist_taxi=" + dist_taxi + ", dist_market=" + dist_market + ", dist_metro="
				+ dist_metro + ", items_available=" + items_available + ", daily_cust_count=" + daily_cust_count
				+ ", store_sales=" + store_sales + ", store_area=" + store_area + ", parking=" + parking
				+ ", coupon_category=" + coupon_category + "]"+"\n";
	} 
}
