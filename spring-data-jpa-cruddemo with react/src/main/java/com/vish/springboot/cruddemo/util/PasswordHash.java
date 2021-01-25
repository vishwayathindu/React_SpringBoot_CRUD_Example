package com.vish.springboot.cruddemo.util;

import com.google.common.hash.Hashing;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class PasswordHash {
    public static String hash(String password){
        byte[] decodedBytes = Base64.getDecoder().decode(password);
        String decodedString = new String(decodedBytes);
        System.out.println(decodedString);
        String pw_hash = decodedString;
        String sha256hex="";

        for(int i=0; i <1000;i++){
            sha256hex = Hashing.sha256()
                    .hashString(pw_hash, StandardCharsets.UTF_8)
                    .toString();
            pw_hash=sha256hex;
        }
        for (int i = 1; i < 5; i++) {
            pw_hash = BCrypt.hashpw(sha256hex, BCrypt.gensalt());
            System.out.println(" password"+i+" "+pw_hash);
        }
        return pw_hash;
    }
    public static String CSVhash(String password){
        String pw_hash = password;
        String sha256hex="";

        for(int i=0; i <1000;i++){
            sha256hex = Hashing.sha256()
                    .hashString(pw_hash, StandardCharsets.UTF_8)
                    .toString();
            pw_hash=sha256hex;
        }
        for (int i = 1; i < 5; i++) {
            pw_hash = BCrypt.hashpw(sha256hex, BCrypt.gensalt());
            System.out.println(" password"+i+" "+pw_hash);
        }
        return pw_hash;
    }
    public static String CheckPass(String password){
        String pw_hash = password;
        String sha256hex="";
        for(int i=0; i <1000;i++){
            sha256hex = Hashing.sha256()
                    .hashString(pw_hash, StandardCharsets.UTF_8)
                    .toString();
            pw_hash=sha256hex;
        }
        return sha256hex;

    }
}
