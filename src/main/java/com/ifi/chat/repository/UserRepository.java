package com.ifi.chat.repository;

import com.ifi.chat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "select * from user u where u.username=:username and u.password=:password", nativeQuery = true)
    User getUser(@Param("username") String username, @Param("password") String password);

    @Query(value = "select * from user u where u.username=:username", nativeQuery = true)
    User getUserByName(@Param("username") String username);
}
